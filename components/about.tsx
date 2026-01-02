export function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">About Me</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a software engineer who enjoys building clean, simple, and scalable systems.
              I like turning ideas into reliable products and writing code that's easy to read,
              maintain, and improve over time.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">  Right now, I focus mostly on backend development and system design, working with
              technologies like Go, Kotlin, TypeScript, and Java to build well-structured APIs
              and services. I'm always curious about better ways to solve problems and improve workflows.</p>
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
