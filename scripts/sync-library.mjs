import { readFile, writeFile, rename } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { resolve } from "node:path"
import { parseEnv } from "node:util"

const CACHE_TTL = 150 * 24 * 60 * 60 * 1000
const statuses = ["completed", "in-progress", "planned", "dropped"]

export function validateLibrary(input) {
  if (!Array.isArray(input)) throw new Error("data/library.json must contain an array.")
  const seen = new Set()
  return input.map((entry, index) => {
    const fail = (message) => { throw new Error(`Library entry ${index + 1}: ${message}`) }
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) fail("expected an object")
    if (!["book", "movie", "series"].includes(entry.type)) fail("type must be book, movie, or series")
    if (!statuses.includes(entry.status)) fail("status must be completed, in-progress, planned, or dropped")
    if (entry.loggedAt != null && (typeof entry.loggedAt !== "string" || !/^\d{4}-(0[1-9]|1[0-2])$/.test(entry.loggedAt))) fail("loggedAt must use YYYY-MM format")
    if (entry.type === "book" && (typeof entry.isbn !== "string" || !/^(\d{9}[\dX]|\d{13})$/.test(entry.isbn))) fail("isbn must be a 10- or 13-character string without hyphens")
    if (entry.type !== "book" && (typeof entry.imdbId !== "string" || !/^tt\d{7,10}$/.test(entry.imdbId))) fail("imdbId must be an IMDb title ID such as tt1375666")
    if (entry.rating != null && (typeof entry.rating !== "number" || !Number.isFinite(entry.rating) || entry.rating < 0 || entry.rating > 10)) fail("rating must be between 0 and 10")
    for (const field of ["title", "note", "progress"]) {
      if (entry[field] != null && (typeof entry[field] !== "string" || !entry[field].trim())) fail(`${field} must be a nonempty string`)
    }
    const key = entry.type === "book" ? `book:${entry.isbn}` : `omdb:${entry.imdbId}`
    if (seen.has(key)) fail(`duplicate ID ${key}`)
    seen.add(key)
    return { ...entry, key }
  })
}

const clean = (value) => typeof value === "string" && value !== "N/A" ? value : ""
const httpsUrl = (value) => typeof value === "string" && value.startsWith("https://") ? value : null

async function requestJson(url, fetcher) {
  const response = await fetcher(url, {
    signal: AbortSignal.timeout(12000),
    headers: { "User-Agent": "KaderGencPortfolio/1.0 (https://kadergenc.github.io; kadergen1@gmail.com)" },
  })
  if (!response.ok) throw new Error("Metadata request failed")
  return response.json()
}

async function fetchMetadata(entry, apiKey, fetcher) {
  if (entry.type === "book") {
    const url = new URL("https://openlibrary.org/search.json")
    url.search = new URLSearchParams({ isbn: entry.isbn, limit: "1", fields: "key,title,author_name,first_publish_year,cover_i" }).toString()
    const body = await requestJson(url, fetcher)
    const book = body.docs?.[0]
    if (!book?.title || !/^\/works\/OL\d+W$/.test(book.key)) throw new Error("Book not found")
    return {
      title: book.title,
      year: book.first_publish_year ? String(book.first_publish_year) : "",
      authors: Array.isArray(book.author_name) ? book.author_name.filter((author) => typeof author === "string") : [],
      genres: [],
      description: "",
      image: Number.isInteger(book.cover_i) && book.cover_i > 0 ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false` : null,
      url: `https://openlibrary.org${book.key}`,
      imdbRating: null,
    }
  }
  const url = new URL("https://www.omdbapi.com/")
  url.search = new URLSearchParams({ apikey: apiKey, i: entry.imdbId, plot: "short" }).toString()
  const movie = await requestJson(url, fetcher)
  if (movie.Response !== "True" || movie.imdbID !== entry.imdbId || movie.Type !== entry.type || !clean(movie.Title)) throw new Error("Movie or series not found")
  const rating = Number.parseFloat(movie.imdbRating)
  return {
    title: movie.Title,
    year: clean(movie.Year),
    authors: [],
    genres: clean(movie.Genre).split(", ").filter(Boolean),
    description: clean(movie.Plot),
    image: httpsUrl(movie.Poster),
    url: `https://www.imdb.com/title/${entry.imdbId}/`,
    imdbRating: Number.isFinite(rating) && rating >= 0 && rating <= 10 ? rating : null,
  }
}

export async function syncLibrary({ root = process.cwd(), fetcher = fetch, apiKey = process.env.OMDB_API_KEY, refresh = false, now = Date.now(), pause = (ms) => new Promise((done) => setTimeout(done, ms)), warn = console.warn } = {}) {
  const entries = validateLibrary(JSON.parse(await readFile(resolve(root, "data/library.json"), "utf8")))
  const cachePath = resolve(root, "data/library-metadata.json")
  let previous = {}
  try {
    previous = JSON.parse(await readFile(cachePath, "utf8"))
    if (!previous || typeof previous !== "object" || Array.isArray(previous)) throw new Error("Invalid cache")
  } catch (error) {
    if (error.code !== "ENOENT") throw error
  }
  const cache = {}
  let requestedBook = false
  let warnedAboutKey = false
  for (const entry of entries) {
    const saved = previous[entry.key]
    if (saved?.data) cache[entry.key] = saved
    const age = now - Date.parse(saved?.fetchedAt)
    if (!refresh && saved?.data && age >= 0 && age < CACHE_TTL) continue
    if (entry.type !== "book" && !apiKey) {
      if (!warnedAboutKey) warn("OMDB_API_KEY is not set. Movies/series will use cached metadata or fallback titles.")
      warnedAboutKey = true
      continue
    }
    try {
      if (entry.type === "book") {
        if (requestedBook) await pause(1100)
        requestedBook = true
      }
      const data = await fetchMetadata(entry, apiKey, fetcher)
      cache[entry.key] = { fetchedAt: new Date(now).toISOString(), data }
    } catch {
      // Never print request URLs or provider errors: they may contain credentials.
      warn(`Metadata unavailable for ${entry.key}; keeping cached data or using a fallback.`)
    }
  }
  const output = JSON.stringify(cache, null, 2) + "\n"
  await writeFile(`${cachePath}.tmp`, output)
  await rename(`${cachePath}.tmp`, cachePath)
  return cache
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  for (const name of [".env.local", ".env"]) {
    try {
      const values = parseEnv(await readFile(resolve(process.cwd(), name), "utf8"))
      for (const [key, value] of Object.entries(values)) {
        if (process.env[key] === undefined) process.env[key] = value
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error
    }
  }
  syncLibrary({ refresh: process.argv.includes("--refresh") }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
