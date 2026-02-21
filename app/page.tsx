import type { Metadata } from "next"
import { Header } from "@/components/airbnb/header"
import { HomeHero } from "@/components/airbnb/home-hero"
import { ListingsGrid } from "@/components/airbnb/listings-grid"
import { Footer } from "@/components/airbnb/footer"

export const metadata: Metadata = {
  title: "Alpay House – Choose your stay",
  description: "Browse holiday homes in Foça and İzmir. Book directly with the host.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12">
        <HomeHero />
        <ListingsGrid />
      </main>
      <Footer />
    </div>
  )
}
