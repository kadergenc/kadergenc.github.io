import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { coreStack, education, experiences, leadership, profile, selectedProjects, voluntaryWork } from "@/lib/resume"
import styles from "./resume.module.css"

export const metadata: Metadata = {
  title: "Resume | Kader Genç — Software Developer",
  description: profile.summary,
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.section}><h2>{title}</h2>{children}</section>
}

export default function ResumePage() {
  const [trendyol, ...earlierExperiences] = experiences

  return (
    <div className={styles.page}>
      <div className={styles.screenOnly}><Navigation /></div>
      <main className={styles.main}>
        <div className={`${styles.toolbar} ${styles.screenOnly}`}>
          <Link href="/" className="inline-flex items-center gap-2 text-sm hover:underline">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back to home
          </Link>
          <Button asChild variant="outline">
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/KaderGencResume.pdf`} download="KaderGencResume.pdf">
              <Download aria-hidden="true" /> Download PDF
            </a>
          </Button>
        </div>

        <article className={styles.document} aria-label="Kader Genç resume">
          <header className={styles.header}>
            <h1>{profile.name}</h1>
            <p className={styles.role}>{profile.title} <span>· Backend Engineering</span></p>
            <div className={styles.accent} />
            <p className={styles.summary}>{profile.summary}</p>
            <div className={styles.contacts}>
              <a href={profile.github}>github.com/kadergenc</a>
              <a href={profile.website}>kadergenc.github.io</a>
              <a href={profile.linkedin}>linkedin.com/in/kadergenc</a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </header>

          <Section title="Core Stack">
            {coreStack.map((group) => <p key={group.title} className={styles.stack}><strong>{group.title}:</strong> {group.detail}</p>)}
          </Section>

          <Section title="Experience">
            <div className={styles.entryHeading}>
              <h3><a href={trendyol.companyUrl}>{trendyol.company}</a> <span>· E-commerce</span></h3>
              <p>{trendyol.period}</p>
            </div>
            <p className={styles.jobTitle}>{trendyol.title} · {trendyol.location}</p>
            <div className={styles.roles}>
              <p><strong>{trendyol.roles?.join(" → ")}</strong></p>
            </div>
            <ul className={styles.highlights}>
              {trendyol.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </Section>

          <div className={styles.secondPage}>
            <Section title="Earlier Experience">
              <div className={styles.earlier}>
                {earlierExperiences.map((experience) => (
                  <div key={experience.company} className={styles.entry}>
                    <div className={styles.entryHeading}>
                      <h3><a href={experience.companyUrl}>{experience.company}</a></h3>
                      <p>{experience.period}</p>
                    </div>
                    <p className={styles.jobTitle}>{experience.title} · {experience.location}</p>
                    {experience.highlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Project">
              {selectedProjects.map((project) => (
                <div key={project.name} className={styles.entry}>
                  <h3><a href={project.url}>{project.name}</a></h3>
                  <p>{project.detail}</p>
                  <a className={styles.projectLink} href={project.url}>{project.url.replace("https://", "")}</a>
                </div>
              ))}
            </Section>

            <Section title="Education">
              {education.map((item) => (
                <div key={item.program} className={styles.entry}>
                  <div className={styles.entryHeading}><h3>{item.institution}</h3><p>{item.period}</p></div>
                  <p>{item.level} in {item.program}</p>
                </div>
              ))}
            </Section>

            <Section title="Leadership & Achievements">
              <div className={styles.entry}><h3><a href={leadership.url}>{leadership.title}</a></h3><p>{leadership.detail}</p></div>
            </Section>

            <Section title="Volunteering">
              {voluntaryWork.map((item) => <p key={item.title} className={styles.volunteering}><strong>{item.title}:</strong> {item.detail}</p>)}
            </Section>
          </div>
        </article>
      </main>
    </div>
  )
}
