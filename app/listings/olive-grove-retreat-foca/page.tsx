import type { Metadata } from "next"
import { BookingProvider } from "@/components/airbnb/booking-context"
import { BookingStatusProvider } from "@/components/airbnb/booking-status-context"
import { AvailabilityDatesProvider } from "@/components/airbnb/availability-dates-context"
import { Header } from "@/components/airbnb/header"
import { PhotoGallery } from "@/components/airbnb/photo-gallery"
import { ListingHeader } from "@/components/airbnb/listing-header"
import { HostInfo } from "@/components/airbnb/host-info"
import { ListingDescription } from "@/components/airbnb/listing-description"
import { Amenities } from "@/components/airbnb/amenities"
import { InlineAvailabilityCalendar } from "@/components/airbnb/inline-availability-calendar"
import { BookingCard } from "@/components/airbnb/booking-card"
import { Reviews } from "@/components/airbnb/reviews"
import { LocationSection } from "@/components/airbnb/location-section"
import { HostProfile } from "@/components/airbnb/host-profile"
import { HouseRules } from "@/components/airbnb/house-rules"
import { Footer } from "@/components/airbnb/footer"
import { MobileBottomBar } from "@/components/airbnb/mobile-bottom-bar"

export const metadata: Metadata = {
  title: "Olive Grove Retreat – Foça – Alpay House",
  description: "House in a 10-acre olive grove near Old Foça and New Foça. Mountain and garden views, self check-in. Book directly.",
}

export default function OliveGroveRetreatPage() {
  return (
    <BookingStatusProvider>
      <AvailabilityDatesProvider listingId="olive-grove-retreat-foca">
        <BookingProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12">
          {/* Listing Header */}
          <ListingHeader />

          {/* Photo Gallery */}
          <PhotoGallery />

          {/* Content Area - Two Column Layout */}
          <div className="flex flex-col lg:flex-row lg:gap-20">
            {/* Left Column - Details */}
            <div className="flex-1 lg:max-w-[680px]">
              <HostInfo />
              <ListingDescription />
              <Amenities />
              <InlineAvailabilityCalendar />
            </div>

            {/* Right Column - Booking Card (desktop) */}
            <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0 lg:pt-10">
              <BookingCard />
            </div>
          </div>

          {/* Reviews */}
          <Reviews />

          {/* Location */}
          <LocationSection />

          {/* Host Profile */}
          <HostProfile />

          {/* Things to Know */}
          <HouseRules />
        </main>

        <Footer />

        {/* Mobile Bottom Bar */}
        <MobileBottomBar />

        {/* Spacer for mobile bottom bar */}
        <div className="h-20 lg:hidden" />
      </div>
        </BookingProvider>
      </AvailabilityDatesProvider>
    </BookingStatusProvider>
  )
}

