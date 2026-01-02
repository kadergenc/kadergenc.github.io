import { Card } from "@/components/ui/card"

const experiences = [
  {
    title: "Software Engineer",
    company: "Trendyol",
    companyUrl: "https://www.trendyol.com/",
    location: "Remote",
    period: "Jun 2022 — Present",
    highlights: [
      "Working as a fullstack developer using React.js and Svelte on the frontend and working with several microservices written in Node.js (NestJS), Go and Kotlin/Java (Spring) on the backend. Databases involved are Couchbase and PostgreSQL.",
      "Working on real-time, high-throughput event processing systems using Kafka Streams. Designing and implementing resilient, self-healing, anti-fragile systems from ground-up.",
    ],
    skills: ["React.js", "Svelte", "Node.js", "NestJS", "Go", "Kotlin", "Java", "Spring", "Couchbase", "PostgreSQL", "Kafka Streams"],
  },
  {
    title: "Researcher",
    company: "Turkey National Observatories",
    companyUrl: "https://atasam.atauni.edu.tr/dag/",
    location: "Erzurum, Turkey",
    period: "Sep 2021 — Jun 2022",
    highlights: [
      "Completed my final year undergraduate graduation project at the Eastern Anatolia Observatory, focusing on developing the OPC UA integration project for DAG-MAM systems.",
      "Created automation software for telescope sub-devices within the DAG project using C++ and Python.",
    ],
    skills: ["OPC UA", "C++", "Python"],
  },
  {
    title: "Researcher",
    company: "Atatürk University Big Data Management Office",
    companyUrl: "https://veri.atauni.edu.tr/",
    location: "Erzurum, Turkey",
    period: "Sep 2021 — Jun 2022",
    highlights: [
      "Handled data submission to international ranking organizations by collecting required data, processing it using Python, and ensuring usability.",
      "Gathered Sustainable Development Goals (SDG) data and entered it into the SDG website we developed using WordPress. Also managed social media platforms and websites for the office.",
    ],
    skills: ["Python", "WordPress", "SDG"],
  },
  {
    title: "Project Intern",
    company: "TÜBİTAK Marmara Research Center",
    companyUrl: "https://mam.tubitak.gov.tr/",
    location: "İstanbul, Turkey",
    period: "Jun 2021 — Aug 2021",
    highlights: ["Developed a C# automation tool for employees of the Polar Research Institute to support scientific expeditions."],
    skills: ["C#"],
  },
  {
    title: "Project Intern",
    company: "TÜBİTAK SAGE",
    companyUrl: "https://www.sage.tubitak.gov.tr/",
    location: "Ankara, Turkey",
    period: "Jan 2021 — Feb 2021",
    highlights: [
      "Implemented socket programming for structured sender/receiver systems, enabling communication using UDP.",
      "Developed a system for transmitting files using TFTP.",
    ],
    skills: ["Socket Programming", "UDP", "TFTP"],
  },
]

const education = [
  {
    institution: "Ataturk University",
    program: "Computer Engineering",
    level: "Undergrad",
    period: "2017 — 2022",
  },
  {
    institution: "Ataturk University, Institute of Science",
    program: "Optics and Photonics",
    level: "Master's Degree",
    period: "2023 — Present",
  },
]

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
