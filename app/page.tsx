import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Library } from "@/components/library"
import { getLibraryItems } from "@/lib/library"
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
        <Library items={getLibraryItems()} />
        <Contact />
      </main>
    </div>
  )
}
