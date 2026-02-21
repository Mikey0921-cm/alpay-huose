import type { Metadata } from "next"
import { BookingProviderThirdHouse } from "@/components/airbnb/booking-context-third-house"
import { BookingStatusProvider } from "@/components/airbnb/booking-status-context"
import { AvailabilityDatesProvider } from "@/components/airbnb/availability-dates-context"
import { Header } from "@/components/airbnb/header"
import { PhotoGalleryThirdHouse } from "@/components/airbnb/photo-gallery-third-house"
import { HostInfoSecondHouse } from "@/components/airbnb/host-info-second-house"
import { ListingDescriptionThirdHouse } from "@/components/airbnb/listing-description-third-house"
import { AmenitiesThirdHouse } from "@/components/airbnb/amenities-third-house"
import { InlineAvailabilityCalendarThirdHouse } from "@/components/airbnb/inline-availability-calendar-third-house"
import { BookingCardThirdHouse } from "@/components/airbnb/booking-card-third-house"
import { UrgencyCard } from "@/components/airbnb/urgency-card"
import { ReportListing } from "@/components/airbnb/report-listing"
import { Reviews } from "@/components/airbnb/reviews"
import { LocationSection } from "@/components/airbnb/location-section"
import { HostProfile } from "@/components/airbnb/host-profile"
import { HouseRules } from "@/components/airbnb/house-rules"
import { Footer } from "@/components/airbnb/footer"
import { MobileBottomBarThirdHouse } from "@/components/airbnb/mobile-bottom-bar-third-house"
import { ListingHeaderThirdHouse } from "@/components/airbnb/listing-header-third-house"

export const metadata: Metadata = {
  title: "Third House – İzmir – Alpay House",
  description: "Holiday home in İzmir. Book directly with the host.",
}

export default function ThirdHousePage() {
  return (
    <BookingStatusProvider>
      <AvailabilityDatesProvider listingId="third-house">
        <BookingProviderThirdHouse>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12">
          {/* Listing Header */}
          <ListingHeaderThirdHouse />

          {/* Photo Gallery */}
          <PhotoGalleryThirdHouse />

          {/* Content Area - Two Column Layout */}
          <div className="flex flex-col lg:flex-row lg:gap-20">
            {/* Left Column - Details */}
            <div className="flex-1 lg:max-w-[680px]">
              <HostInfoSecondHouse />
              <ListingDescriptionThirdHouse />
              <AmenitiesThirdHouse />
              <InlineAvailabilityCalendarThirdHouse />
            </div>

            {/* Right Column - Booking Card, Urgency Card, Report (desktop) */}
            <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0 lg:pt-10">
              <BookingCardThirdHouse />
              <UrgencyCard />
              <div className="mt-4">
                <ReportListing />
              </div>
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
        <MobileBottomBarThirdHouse />

        {/* Spacer for mobile bottom bar */}
        <div className="h-20 lg:hidden" />
      </div>
        </BookingProviderThirdHouse>
      </AvailabilityDatesProvider>
    </BookingStatusProvider>
  )
}
