import { Card } from "@/components/ui/card"
import { Award, Trophy, Star, Briefcase as Certificate } from "lucide-react"

const achievements = [
  {
    title: "AtaUni Rocket Team",
    issuer: "Atatürk University",
    date: "Co-leader",
    icon: Trophy,
    description:
      "Co-led the rocket team since its establishment and helped develop +3 distinct rockets. Contributed to team management and the avionics unit by writing control systems, developing ground stations, managing flight cards, and supporting design.",
  },
  {
    title: "1st Place — TEKNOFEST Aviation & Space Competition",
    issuer: "TEKNOFEST",
    date: "Turkey",
    icon: Trophy,
    description: "Achieved 1st place at Turkey’s TEKNOFEST Aviation & Space Competition.",
  },
  {
    title: "Finalist — IREC Rocket Competition",
    issuer: "IREC",
    date: "United States",
    icon: Award,
    description: "Became a finalist at the IREC Rocket Competition in the United States.",
  },
]

const milestones = [
  "Co-leader since the team’s establishment",
  "Developed +3 distinct rockets",
  "Worked in avionics: control systems, ground stations, flight card management",
]

export function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Achievements</h2>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Certifications, awards, and notable accomplishments throughout my career.
        </p>

        {/* Certifications & Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card key={index} className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement.issuer} • {achievement.date}
                    </p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Career Milestones */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Career Milestones</h3>
          <Card className="p-6 border-border">
            <ul className="space-y-3">
              {milestones.map((milestone, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1.5">✓</span>
                  <span className="text-muted-foreground">{milestone}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
