import { Card } from "@/components/ui/card"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:kadergen1@gmail.com",
    label: "kadergen1@gmail.com",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/kadergenc",
    label: "github.com/kadergenc",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kadergenc/",
    label: "linkedin.com/in/kadergenc",
  },
  // {
  //   name: "Twitter",
  //   icon: Twitter,
  //   href: "https://twitter.com/yourusername",
  //   label: "@yourusername",
  // },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Contact</h2>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Feel free to reach out for collaborations, opportunities, or just to say hello.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <Card key={index} className="p-6 border-border hover:border-primary/50 transition-colors group">
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{link.name}</h3>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                  </div>
                </a>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kader Genç. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  )
}
