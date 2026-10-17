import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { syncLibrary, validateLibrary } from "./sync-library.mjs"

const book = { type: "book", isbn: "9780140328721", status: "completed", rating: 0 }
const movie = { type: "movie", imdbId: "tt1375666", status: "completed", rating: 9 }
const movieResponse = { Response: "True", imdbID: movie.imdbId, Type: "movie", Title: "Inception", Year: "2010", Genre: "Action, Sci-Fi", Plot: "A story about dreams.", Poster: "https://example.com/poster.jpg", imdbRating: "8.8" }
const timestamp = "2026-10-17T00:00:00.000Z"

async function fixture(t, entries, cache = {}) {
  const root = await mkdtemp(join(tmpdir(), "portfolio-library-"))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(join(root, "data"))
  await writeFile(join(root, "data/library.json"), JSON.stringify(entries))
  await writeFile(join(root, "data/library-metadata.json"), JSON.stringify(cache))
  return root
}

const options = { now: Date.parse(timestamp), pause: async () => {}, warn: () => {} }
const ok = (body) => ({ ok: true, json: async () => body })

test("validates identifiers, status, ratings, and duplicates before fetching", () => {
  assert.equal(validateLibrary([book])[0].rating, 0)
  assert.equal(validateLibrary([{ ...movie, status: "dropped", loggedAt: "2025-10", progress: "S2E6" }])[0].progress, "S2E6")
  for (const entries of [null, [null], [{ ...book, rating: 11 }], [{ ...book, status: "done" }], [{ ...book, isbn: 9780140328721 }], [{ ...movie, imdbId: "bad" }], [movie, { ...movie, type: "series" }]]) {
    assert.throws(() => validateLibrary(entries))
  }
  for (const loggedAt of ["2025-13", "2025-00", "2025-1", "2025-10-01", 202510]) {
    assert.throws(() => validateLibrary([{ ...movie, loggedAt }]), /loggedAt/)
  }
  assert.throws(() => validateLibrary([{ ...movie, progress: "" }]), /progress/)
})

test("fetches both providers, normalizes data, and never persists the API key", async (t) => {
  const root = await fixture(t, [book, movie])
  const requests = []
  const cache = await syncLibrary({ ...options, root, apiKey: "private-test-key", fetcher: async (url) => {
    requests.push(url)
    return ok(url.hostname === "openlibrary.org" ? { docs: [{ key: "/works/OL45804W", title: "Matilda", author_name: ["Roald Dahl"], first_publish_year: 1988, cover_i: 123 }] } : movieResponse)
  } })
  assert.equal(cache[`book:${book.isbn}`].data.authors[0], "Roald Dahl")
  assert.equal(cache[`omdb:${movie.imdbId}`].data.imdbRating, 8.8)
  assert.equal(requests[0].searchParams.get("isbn"), book.isbn)
  assert.equal(requests[1].searchParams.get("i"), movie.imdbId)
  assert.equal(requests[1].searchParams.get("apikey"), "private-test-key")
  assert.ok(!(await readFile(join(root, "data/library-metadata.json"), "utf8")).includes("private-test-key"))
})

test("fresh cache skips requests and deleted entries are pruned", async (t) => {
  const saved = { fetchedAt: timestamp, data: { title: "Inception" } }
  const root = await fixture(t, [movie], { [`omdb:${movie.imdbId}`]: saved, "book:removed": saved })
  const cache = await syncLibrary({ ...options, root, fetcher: () => { throw new Error("should not fetch") } })
  assert.deepEqual(cache, { [`omdb:${movie.imdbId}`]: saved })
})

test("provider outage keeps stale metadata without leaking credentials to warnings", async (t) => {
  const saved = { fetchedAt: "2020-01-01T00:00:00Z", data: { title: "Inception" } }
  const root = await fixture(t, [movie], { [`omdb:${movie.imdbId}`]: saved })
  const warnings = []
  const cache = await syncLibrary({ ...options, root, apiKey: "secret", warn: (message) => warnings.push(message), fetcher: async () => { throw new Error("URL contains secret") } })
  assert.deepEqual(cache[`omdb:${movie.imdbId}`], saved)
  assert.equal(warnings.length, 1)
  assert.ok(!warnings[0].includes("secret"))
})

test("missing key permits fallback data and does not make OMDb requests", async (t) => {
  const root = await fixture(t, [movie])
  let requested = false
  const cache = await syncLibrary({ ...options, root, apiKey: "", fetcher: async () => { requested = true } })
  assert.deepEqual(cache, {})
  assert.equal(requested, false)
})

test("provider N/A fields and non-HTTPS posters are handled", async (t) => {
  const root = await fixture(t, [movie])
  const cache = await syncLibrary({ ...options, root, apiKey: "test", fetcher: async () => ok({ ...movieResponse, Poster: "http://example.com/poster.jpg", imdbRating: "N/A", Genre: "N/A" }) })
  const data = cache[`omdb:${movie.imdbId}`].data
  assert.equal(data.image, null)
  assert.equal(data.imdbRating, null)
  assert.deepEqual(data.genres, [])
})

test("wrong movie/series type is rejected rather than displaying another title", async (t) => {
  const root = await fixture(t, [movie])
  const cache = await syncLibrary({ ...options, root, apiKey: "test", fetcher: async () => ok({ ...movieResponse, Type: "series" }) })
  assert.deepEqual(cache, {})
})

test("explicit refresh ignores cache freshness", async (t) => {
  const root = await fixture(t, [movie], { [`omdb:${movie.imdbId}`]: { fetchedAt: timestamp, data: { title: "Old title" } } })
  const cache = await syncLibrary({ ...options, root, refresh: true, apiKey: "test", fetcher: async () => ok(movieResponse) })
  assert.equal(cache[`omdb:${movie.imdbId}`].data.title, "Inception")
})
