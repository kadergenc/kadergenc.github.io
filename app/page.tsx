import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Watchlist } from "@/components/watchlist"
import { Articles } from "@/components/articles"
import { Achievements } from "@/components/achievements"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Articles />
        <Achievements />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
