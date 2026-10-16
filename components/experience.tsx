import { Card } from "@/components/ui/card"

import { experiences, education } from "@/lib/resume"

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Experience</h2>

        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-6">Work History</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 border-border">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-muted-foreground">
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        {exp.company}
                      </a>
                      {exp.location ? ` • ${exp.location}` : null}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">{exp.period}</span>
                </div>
                {exp.roles && (
                  <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{exp.roles.join(" → ")}</p>
                  </div>
                )}
                <ul className="text-muted-foreground leading-relaxed mb-4 list-disc pl-5 space-y-2">
                  {exp.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Education</h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="p-6 border-border">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">
                      • {edu.institution} • {edu.program} • <span className="italic">{edu.level}</span>
                    </h4>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1 md:mt-0">{edu.period}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
