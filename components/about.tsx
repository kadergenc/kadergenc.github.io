export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Me</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a software developer focused on backend engineering at Trendyol.
              I build payment systems and shared platform products for advertising teams,
              using technologies such as Go, Java, Kotlin, TypeScript, Kafka, and PostgreSQL.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
              My work includes a payment pipeline that processes 200 million messages daily,
              shared configuration services with SDKs for multiple languages, and an internal
              cron-driven automation tool I built from scratch with Deno and PostgreSQL,
              now used by more than 20 teams.
              I enjoy owning problems from the first discussion through production and improving
              the tools and workflows engineers use every day.
          </p>
          <p className="text-muted-foreground leading-relaxed">
              When I'm not coding, you'll usually find me traveling, exploring new places,
              learning new things, or working on personal projects that help me grow both
              technically and creatively.
          </p>
        </div>
      </div>
    </section>
  )
}
