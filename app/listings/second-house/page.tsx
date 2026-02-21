import type { Metadata } from "next"
import { BookingProviderSecondHouse } from "@/components/airbnb/booking-context-second-house"
import { BookingStatusProvider } from "@/components/airbnb/booking-status-context"
import { AvailabilityDatesProvider } from "@/components/airbnb/availability-dates-context"
import { Header } from "@/components/airbnb/header"
import { PhotoGallerySecondHouse } from "@/components/airbnb/photo-gallery-second-house"
import { HostInfoSecondHouse } from "@/components/airbnb/host-info-second-house"
import { ListingDescription } from "@/components/airbnb/listing-description"
import { Amenities } from "@/components/airbnb/amenities"
import { InlineAvailabilityCalendarSecondHouse } from "@/components/airbnb/inline-availability-calendar-second-house"
import { BookingCardSecondHouse } from "@/components/airbnb/booking-card-second-house"
import { UrgencyCard } from "@/components/airbnb/urgency-card"
import { ReportListing } from "@/components/airbnb/report-listing"
import { ReviewsSecondHouse } from "@/components/airbnb/reviews-second-house"
import { LocationSection } from "@/components/airbnb/location-section"
import { HostProfile } from "@/components/airbnb/host-profile"
import { HouseRules } from "@/components/airbnb/house-rules"
import { Footer } from "@/components/airbnb/footer"
import { MobileBottomBarSecondHouse } from "@/components/airbnb/mobile-bottom-bar-second-house"
import { ListingHeaderSecondHouse } from "@/components/airbnb/listing-header-second-house"

export const metadata: Metadata = {
  title: "Second House – Foça – Alpay House",
  description: "Holiday home in Foça. Book directly with the host.",
}

export default function SecondHousePage() {
  return (
    <BookingStatusProvider>
      <AvailabilityDatesProvider listingId="second-house">
        <BookingProviderSecondHouse>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-12">
          {/* Listing Header */}
          <ListingHeaderSecondHouse />

          {/* Photo Gallery */}
          <PhotoGallerySecondHouse />

          {/* Content Area - Two Column Layout */}
          <div className="flex flex-col lg:flex-row lg:gap-20">
            {/* Left Column - Details */}
            <div className="flex-1 lg:max-w-[680px]">
              <HostInfoSecondHouse />
              <ListingDescription />
              <Amenities />
              <InlineAvailabilityCalendarSecondHouse />
            </div>

            {/* Right Column - Booking Card, Urgency Card, Report (desktop) */}
            <div className="hidden lg:block lg:w-[400px] lg:flex-shrink-0 lg:pt-10">
              <BookingCardSecondHouse />
              <UrgencyCard />
              <div className="mt-4">
                <ReportListing />
              </div>
            </div>
          </div>

          {/* Reviews */}
          <ReviewsSecondHouse />

          {/* Location */}
          <LocationSection />

          {/* Host Profile */}
          <HostProfile />

          {/* Things to Know */}
          <HouseRules />
        </main>

        <Footer />

        {/* Mobile Bottom Bar */}
        <MobileBottomBarSecondHouse />

        {/* Spacer for mobile bottom bar */}
        <div className="h-20 lg:hidden" />
      </div>
        </BookingProviderSecondHouse>
      </AvailabilityDatesProvider>
    </BookingStatusProvider>
  )
}
