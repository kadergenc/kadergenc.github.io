import Image from "next/image"
import profilePhoto from "@/public/images/profile-photo.jpg"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Profile Photo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border shadow-2xl">
              <Image
                src={profilePhoto}
                alt="Profile Photo"
                fill
                className="object-cover object-[15%_center]"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Kader Genç</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">Software Developer</p>
            <p className="text-lg text-muted-foreground max-w-2xl text-pretty">  I like building simple things that work well and actually make life easier.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
