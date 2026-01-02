import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

type Project = {
  title: string
  description: string
  technologies: string[]
  image?: string
  liveUrl?: string
  githubUrl: string
}

const projects: Project[] = [
  {
    title: "Comrade",
    description:
      "Comrade is a synchronization program that allows a few people to watch TV series or movies simultaneously. It primarily leverages the mpv player and some of its specific features. It uses Socket.io to communicate and synchronize users.",
    technologies: ["Javascript", "TypeScript"],
    image: "/comrade.jpg",
    githubUrl: "https://github.com/kadergenc/comrade",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Projects</h2>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Selected projects showcasing my work across different technologies and domains.
        </p>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl ? (
                      <Button asChild variant="default">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
