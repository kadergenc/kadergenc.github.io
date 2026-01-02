"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Star } from "lucide-react"

const watchlistItems = [
  {
    title: "Inception",
    year: 2010,
    type: "Movie",
    status: "watched",
    personalRating: 9.5,
    imdbRating: 8.8,
    genre: ["Sci-Fi", "Thriller"],
    poster: "/inception-movie-poster.png",
  },
  {
    title: "Breaking Bad",
    year: 2008,
    type: "Series",
    status: "watched",
    personalRating: 9.8,
    imdbRating: 9.5,
    genre: ["Crime", "Drama"],
    poster: "/breaking-bad-series-poster.jpg",
  },
  {
    title: "Dune: Part Two",
    year: 2024,
    type: "Movie",
    status: "watching",
    personalRating: 9.0,
    imdbRating: 8.6,
    genre: ["Sci-Fi", "Adventure"],
    poster: "/dune-part-two-poster.png",
  },
  {
    title: "The Last of Us",
    year: 2023,
    type: "Series",
    status: "watching",
    personalRating: 8.9,
    imdbRating: 8.8,
    genre: ["Drama", "Adventure"],
    poster: "/the-last-of-us-series-poster.jpg",
  },
  {
    title: "Oppenheimer",
    year: 2023,
    type: "Movie",
    status: "plan-to-watch",
    personalRating: null,
    imdbRating: 8.5,
    genre: ["Biography", "Drama"],
    poster: "/images/posters/oppenheimer-poster.png",
  },
  {
    title: "The Bear",
    year: 2022,
    type: "Series",
    status: "plan-to-watch",
    personalRating: null,
    imdbRating: 8.7,
    genre: ["Drama", "Comedy"],
    poster: "/the-bear-series-poster.jpg",
  },
]

const statusConfig = {
  watched: { label: "Watched", icon: Eye, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  watching: { label: "Watching", icon: Clock, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  "plan-to-watch": {
    label: "Plan to Watch",
    icon: Star,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
}

export function Watchlist() {
  const [activeType, setActiveType] = useState<"all" | "Movie" | "Series">("all")
  const [activeStatus, setActiveStatus] = useState<"all" | "watched" | "watching" | "plan-to-watch">("all")
  const [activeGenre, setActiveGenre] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"imdb" | "personal">("personal")

  const allGenres = Array.from(new Set(watchlistItems.flatMap((item) => item.genre)))

  const filteredItems = watchlistItems
    .filter((item) => {
      if (activeType !== "all" && item.type !== activeType) return false
      if (activeStatus !== "all" && item.status !== activeStatus) return false
      if (activeGenre !== "all" && !item.genre.includes(activeGenre)) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "imdb") {
        return (b.imdbRating || 0) - (a.imdbRating || 0)
      } else {
        return (b.personalRating || 0) - (a.personalRating || 0)
      }
    })

  return (
    <section id="watchlist" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Watchlist</h2>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Movies and series I've watched, currently watching, or planning to watch.
        </p>

        <div className="mb-8 space-y-6">
          {/* Type Filter */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Type</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "Movie", "Series"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "watched", "watching", "plan-to-watch"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeStatus === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : status === "plan-to-watch"
                      ? "Plan to Watch"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Genre and Sort Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Genre Filter */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground mb-3">Genre</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveGenre("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeGenre === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  All
                </button>
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeGenre === genre
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Sort By</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("personal")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    sortBy === "personal"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Personal Rating
                </button>
                <button
                  onClick={() => setSortBy("imdb")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    sortBy === "imdb"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  IMDb Rating
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredItems.length} of {watchlistItems.length} items
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const StatusIcon = statusConfig[item.status as keyof typeof statusConfig].icon
            return (
              <Card
                key={index}
                className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-[2/3] relative overflow-hidden bg-muted">
                  <img
                    src={item.poster || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      className={`${statusConfig[item.status as keyof typeof statusConfig].color} backdrop-blur-sm`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig[item.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3 flex flex-col gap-1">
                    {item.personalRating && (
                      <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-white">{item.personalRating}</span>
                      </div>
                    )}
                    <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <span className="text-[10px] font-medium text-yellow-400">IMDb</span>
                      <span className="text-xs font-semibold text-white">{item.imdbRating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 text-balance line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.genre.map((g, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items match your current filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
