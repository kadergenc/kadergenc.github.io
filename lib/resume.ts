export const profile = {
  name: "Kader Genç",
  title: "Software Engineer",
  focus: "Backend engineering · Payment systems · Developer tooling",
  summary: "Software Engineer building payment systems and shared backend platforms. Delivered a pipeline processing 200 million messages daily and built a Deno/PostgreSQL automation tool with cron jobs, used by 20+ teams.",
  email: "kadergen1@gmail.com",
  location: "Ankara, Türkiye",
  availability: "Open to remote roles and international relocation with visa sponsorship",
  website: "https://kadergenc.github.io",
  github: "https://github.com/kadergenc",
  linkedin: "https://www.linkedin.com/in/kadergenc/",
}

export const technicalSkills = [
  { title: "Languages", detail: "Go, Java, Kotlin, TypeScript/JavaScript, Python, SQL" },
  { title: "Backend", detail: "Spring, Node.js, NestJS, Deno · APIs, microservices, SDKs" },
  { title: "Data", detail: "PostgreSQL, Couchbase, Kafka, Kafka Streams" },
  { title: "Infrastructure", detail: "Docker, Kubernetes, GitLab CI/CD" },
  { title: "Testing", detail: "Unit tests for Node.js, JVM/Kotlin, and Go · Integration test automation with Testcontainers" },
]

type Experience = {
  title: string
  company: string
  companyUrl: string
  location: string
  period: string
  roles?: string[]
  highlights: string[]
  skills: string[]
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "Trendyol",
    companyUrl: "https://www.trendyol.com/",
    location: "Remote",
    period: "Jun 2022 — Present",
    roles: [
      "Intern",
      "Junior Software Engineer",
      "Software Engineer",
    ],
    highlights: [
      "Replatformed a payment spending consumer using Go, Kafka, and PostgreSQL, owning delivery end to end. The pipeline processes 200 million messages daily; diagnosed memory issues through heap analysis and resolved consumer lag with application-level throttling, addressing an earlier flow that required restarts to recover under high traffic.",
      "Contributed across analysis, design, development, and production rollout of a centralized Java configuration platform with Go, JVM, and Node.js SDKs. Replaced duplicated team-level eligibility logic with a shared service supporting seller, country, region, segment, and default priorities; SDKs resolve configuration once per request and propagate it through the request context.",
      "Initiated and built a cron-driven automation tool using Deno and PostgreSQL from scratch, drove adoption across 20+ teams, and grew contributions from engineers within and beyond the team. Integrated GitLab, Jira, vulnerability, and test-quality data sources to automate manual tracking and surface overlooked issues.",
      "Recently added AI-agent workflows to the automation tool, with adoption still at an early stage. These workflows turn a single manual trigger into task creation and sprint assignment, automating previously five-to-six-step processes such as creating work items for failing tests and coverage gaps identified through Sonar and other quality platforms.",
      "Migrated tightly coupled credit card workflows into the new payment architecture, owning delivery end to end as part of the broader payment replatforming effort.",
      "Reduced failed pipelines by 68% by correcting execution rules and removing duplicate jobs. Maintained team CI/CD pipelines, added caching, and reorganized job dependencies to shorten execution times.",
      "Previously developed advertising-domain features and services using Node.js, Go, Kotlin/Java, React, and Svelte, working with Kafka Streams, Couchbase, and PostgreSQL. Since March 2025, focused on payment and shared platform products used by other Ads teams.",
    ],
    skills: ["Go", "Java", "Kotlin", "TypeScript", "Deno", "Node.js", "Spring", "PostgreSQL", "Kafka", "Couchbase", "GitLab CI/CD"],
  },
  {
    title: "Student Researcher (Part-time)",
    company: "Turkey National Observatories",
    companyUrl: "https://atasam.atauni.edu.tr/dag/",
    location: "Erzurum, Turkey",
    period: "Sep 2021 — Jun 2022",
    highlights: [
      "Developed OPC UA integration for DAG-MAM systems at the Eastern Anatolia Observatory as an undergraduate graduation project, using C++ and Python to automate telescope sub-devices.",
    ],
    skills: ["OPC UA", "C++", "Python"],
  },
  {
    title: "Student Researcher (Part-time)",
    company: "Atatürk University Big Data Management Office",
    companyUrl: "https://veri.atauni.edu.tr/",
    location: "Erzurum, Turkey",
    period: "Sep 2021 — Jun 2022",
    highlights: [
      "Collected and processed university data with Python for international ranking submissions; contributed to a WordPress platform for Sustainable Development Goals reporting.",
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
      "Implemented UDP socket communication between sender and receiver systems and developed TFTP file-transfer functionality.",
    ],
    skills: ["Socket Programming", "UDP", "TFTP"],
  },
]

export const education = [
  {
    institution: "Atatürk University",
    program: "Computer Engineering",
    level: "Bachelor's Degree",
    period: "2017 — 2022",
  },
]

export const selectedProjects = [
  {
    name: "Comrade",
    url: "https://github.com/kadergenc/comrade",
    detail: "TypeScript/JavaScript · Synchronized movie and TV playback for small groups using the mpv player and Socket.io.",
  },
]

export const leadership = {
  title: "AtaUni Rocket Team · Avionics & Team Leadership",
  url: "https://ataunirocketteam.com/",
  roles: [
    "Avionics · 2018–2020",
    "Co-leader · 2020–2022",
    "IREC team co-leader · 2021–2023",
  ],
  detail: "Contributed to team leadership and avionics, developing rocket control software, ground stations, and flight-card systems. The team achieved first place at TEKNOFEST and was a finalist at IREC in the United States.",
}

export const voluntaryWork = [
  { title: "Turkey Technology Team Foundation", detail: "Taught artificial intelligence and mobile programming to middle and high school students over 10 months and mentored student projects." },
  { title: "University technology communities", detail: "Organized technology competitions, software training, and conferences through ATUGEM Technology Club and Atatürk University Computer and IT Club." },
]
