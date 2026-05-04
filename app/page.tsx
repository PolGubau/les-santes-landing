import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { PostersMarquee } from "@/components/sections/posters-marquee"
import { Programme } from "@/components/sections/programme"
import { Footer } from "@/components/sections/footer"

export default function Page() {
  return (
    <main>
      <Hero />
      <Features />
      <PostersMarquee />
      <Programme />
      <Footer />
    </main>
  )
}
