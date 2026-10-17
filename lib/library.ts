import entries from "@/data/library.json"
import metadata from "@/data/library-metadata.json"

export type LibraryType = "book" | "movie" | "series"
export type LibraryStatus = "completed" | "in-progress" | "planned" | "dropped"

type LibraryEntry = {
  type: LibraryType
  isbn?: string
  imdbId?: string
  title?: string
  status: LibraryStatus
  rating?: number | null
  note?: string
  loggedAt?: string
  progress?: string
}

type Metadata = {
  title: string
  year: string
  authors: string[]
  genres: string[]
  description: string
  image: string | null
  url: string
  imdbRating: number | null
}

export type LibraryItem = Metadata & LibraryEntry & { id: string }

export function getLibraryItems(): LibraryItem[] {
  const cache = metadata as Partial<Record<string, { data: Metadata }>>
  return (entries as LibraryEntry[]).map((entry) => {
    const id = entry.type === "book" ? `book:${entry.isbn}` : `omdb:${entry.imdbId}`
    const data = cache[id]?.data
    return {
      year: "",
      authors: [],
      genres: [],
      description: "",
      image: null,
      imdbRating: null,
      url: entry.type === "book" ? `https://openlibrary.org/isbn/${entry.isbn}` : `https://www.imdb.com/title/${entry.imdbId}/`,
      ...data,
      ...entry,
      title: entry.title || data?.title || `${entry.type === "book" ? "Book" : entry.type === "movie" ? "Movie" : "Series"} · ${entry.isbn || entry.imdbId}`,
      id,
    }
  })
}
