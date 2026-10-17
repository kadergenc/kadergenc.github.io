"use client"

import { useState } from "react"
import { ArrowUpRight, BookOpen, Film, Star, Tv } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LibraryItem, LibraryStatus, LibraryType } from "@/lib/library"

const types = { book: { label: "Books", icon: BookOpen }, movie: { label: "Movies", icon: Film }, series: { label: "Series", icon: Tv } }
const statusLabels: Record<LibraryType, Record<LibraryStatus, string>> = {
  book: { completed: "Read", "in-progress": "Reading", planned: "To read", dropped: "Dropped" },
  movie: { completed: "Watched", "in-progress": "Watching", planned: "To watch", dropped: "Dropped" },
  series: { completed: "Watched", "in-progress": "Watching", planned: "To watch", dropped: "Dropped" },
}
const statusFilters: { value: "all" | LibraryStatus; label: string }[] = [
  { value: "all", label: "All statuses" }, { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In progress" }, { value: "planned", label: "Planned" },
  { value: "dropped", label: "Dropped" },
]

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" })

function Cover({ item }: { item: LibraryItem }) {
  const [failed, setFailed] = useState(false)
  const Icon = types[item.type].icon
  return (
    <div className="aspect-[2/3] overflow-hidden rounded-md bg-muted flex items-center justify-center">
      {item.image && !failed
        ? <img src={item.image} alt={`${item.title} cover`} loading="lazy" className="h-full w-full object-cover" onError={() => setFailed(true)} />
        : <Icon className="size-12 text-muted-foreground/50" aria-hidden="true" />}
    </div>
  )
}

export function Library({ items }: { items: LibraryItem[] }) {
  const [type, setType] = useState<"all" | LibraryType>("all")
  const [status, setStatus] = useState<"all" | LibraryStatus>("all")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("listed")
  const filtered = items.filter((item) =>
    (type === "all" || item.type === type) && (status === "all" || item.status === status) &&
    `${item.title} ${item.authors.join(" ")}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  )
  if (sort === "rating") filtered.sort((a, b) => (b.rating ?? -1) - (a.rating ?? -1))
  if (sort === "title") filtered.sort((a, b) => a.title.localeCompare(b.title))
  if (sort === "recent") filtered.sort((a, b) => (b.loggedAt ?? "").localeCompare(a.loggedAt ?? ""))

  return (
    <section id="library" className="py-24 px-6 bg-muted/30 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Off the Clock</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">Books, movies, and series I've spent time with — and what's next on my list.</p>
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter by media type">
          <button type="button" aria-pressed={type === "all"} onClick={() => setType("all")} className={`px-4 py-2 rounded-lg text-sm font-medium ${type === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Everything <span className="ml-1 opacity-70">{items.length}</span></button>
          {(Object.keys(types) as LibraryType[]).map((value) => {
            const Icon = types[value].icon
            return <button key={value} type="button" aria-pressed={type === value} onClick={() => setType(value)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${type === value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="size-4" aria-hidden="true" />{types[value].label}<span className="opacity-70">{items.filter((item) => item.type === value).length}</span></button>
          })}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <label className="flex-1 text-sm text-muted-foreground">Search
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title or author" className="block mt-2 w-full rounded-md border border-border bg-background p-2.5 text-foreground" />
          </label>
          <label className="text-sm text-muted-foreground">Status
            <select value={status} onChange={(event) => setStatus(event.target.value as "all" | LibraryStatus)} className="block mt-2 w-full rounded-md border border-border bg-background p-2.5 text-foreground">{statusFilters.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
          </label>
          <label className="text-sm text-muted-foreground">Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="block mt-2 w-full rounded-md border border-border bg-background p-2.5 text-foreground"><option value="listed">My list order</option><option value="recent">Most recent</option><option value="rating">My rating</option><option value="title">Title</option></select>
          </label>
        </div>
        <p aria-live="polite" className="text-sm text-muted-foreground mb-6">{filtered.length} {filtered.length === 1 ? "item" : "items"}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <Card key={item.id} className="p-5 border-border">
              <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4">
                <Cover item={item} />
                <div className="min-w-0">
                  <Badge variant="secondary" className="mb-2">{statusLabels[item.type][item.status]}</Badge>
                  <h3 className="font-semibold leading-snug"><a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.title}<ArrowUpRight className="inline size-3.5 ml-1" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></h3>
                  <p className="text-xs text-muted-foreground mt-2">{item.type === "book" ? "Book" : item.type === "movie" ? "Movie" : "Series"}{item.year ? ` · ${item.year}` : ""}</p>
                  {item.loggedAt && <p className="text-xs text-muted-foreground mt-1">Logged <time dateTime={item.loggedAt}>{monthFormatter.format(new Date(`${item.loggedAt}-01T00:00:00Z`))}</time></p>}
                  {item.progress && <p className="text-xs text-muted-foreground mt-1">{item.status === "dropped" ? "Stopped at" : "Progress:"} {item.progress}</p>}
                  {item.authors.length > 0 && <p className="text-sm text-muted-foreground mt-1">{item.authors.join(", ")}</p>}
                  {item.rating != null && <p className="text-sm font-medium mt-3 flex items-center gap-1"><Star className="size-3.5 text-amber-600" aria-hidden="true" />My rating: {item.rating}/10</p>}
                  {item.imdbRating != null && <p className="text-xs text-muted-foreground mt-1">IMDb: {item.imdbRating}/10</p>}
                </div>
              </div>
              {item.description && <p className="text-sm text-muted-foreground leading-relaxed mt-4 line-clamp-3">{item.description}</p>}
              {item.note && <p className="text-sm leading-relaxed mt-4 border-l-2 border-primary/30 pl-3">{item.note}</p>}
            </Card>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-12 text-center text-muted-foreground">{items.length === 0 ? "The shelves are empty for now. More soon." : "No matches. Try another search or filter."}</p>}
        <p className="text-xs text-muted-foreground mt-8">Book data from <a href="https://openlibrary.org" className="underline underline-offset-2">Open Library</a>. Movie and series data from <a href="https://www.omdbapi.com/" className="underline underline-offset-2">OMDb</a>.</p>
      </div>
    </section>
  )
}
