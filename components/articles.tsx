import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

const articles = [
  {
    title: "What is the CAP theorem?",
    description:
      "A deep dive into architectural patterns for building large-scale web applications using Next.js and React Server Components.",
    date: "Jun 2023",
    readTime: "4 min read",
    link: "https://medium.com/@kadergenc/what-is-the-cap-theorem-f2467e0c5448",
  },
  {
    title: "What is ORM? Why is it used? What are its pros and cons?",
    description:
      "Exploring modern techniques for optimizing web applications, from code splitting to edge computing and beyond.",
    date: "May 2023",
    readTime: "2 min read",
    link: "https://medium.com/@kadergenc/what-is-orm-why-is-it-used-what-are-its-pros-and-cons-3ed77c0e6ed2",
  },
  {
    title: "What is Clean Code — Solid? Why should we use it?",
    description:
      "How to create and maintain design systems that work across multiple products and teams while ensuring consistency.",
    date: "Apr 2023",
    readTime: "6 min read",
    link: "https://medium.com/@kadergenc/what-is-clean-code-solid-why-should-we-use-it-fcb52c214bb4",
  },
  {
    title: "My Trendyol Journey From Talent Program to Part of the Development Team",
    description:
      "A comprehensive guide to contemporary JavaScript patterns and best practices for writing maintainable code.",
    date: "April 2023",
    readTime: "4 min read",
    link: "https://medium.com/trendyol-tech/my-trendyol-journey-from-talent-program-to-part-of-the-development-team-fe07909176f4",
  },
    {
        title: "What is the Apache Kafka?",
        description:
            "A comprehensive guide to contemporary JavaScript patterns and best practices for writing maintainable code.",
        date: "May 2023",
        readTime: "4 min read",
        link: "https://medium.com/@kadergenc/what-is-the-apache-kafka-efd7a8152f63",
    },
]

export function Articles() {
  return (
    <section id="articles" className="py-24 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Articles</h2>
        <p className="text-muted-foreground mb-12 leading-relaxed">
          Technical writings and thoughts on web development, design, and technology.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="p-6 border-border hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <a href={article.link} className="block">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{article.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
