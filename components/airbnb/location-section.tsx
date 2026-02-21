"use client"

import { useState } from "react"

const MAP_CENTER = "38.6706,26.852"
const GOOGLE_MAPS_LINK = `https://www.google.com/maps?q=${MAP_CENTER}&z=14`
const STATIC_MAP_URL = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(MAP_CENTER)}&key=AIzaSyBEPXkdNeppUGoYTnxRJNEPmWfHdRpcmXU&maptype=roadmap&scale=2&size=640x480&zoom=14&map_id=76aa4feafa54e1b485876b96`
const EMBED_MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24844.60284157743!2d26.852!3d38.6706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b9680b1060c3db%3A0xfe2ff56b7d78f99a!2sFo%C3%A7a%2C%20%C4%B0zmir%2C%20Turkey!5e0!3m2!1sen!2sus"

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M7.07.6A1.5 1.5 0 0 1 8.81.5l.12.09 5.69 4.5a1 1 0 0 1 .37.65l.01.13v7.62a1.5 1.5 0 0 1-1.36 1.5H2.5A1.5 1.5 0 0 1 1 13.64V5.88a1 1 0 0 1 .28-.7l.1-.09L7.07.6zM11 6.44l-4 4-2-2L3.94 9.5 7 12.56l5.06-5.06L11 6.44z" />
    </svg>
  )
}

function FullscreenIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
    >
      <g fill="none">
        <path d="m14 29h-10.2c-.4418278 0-.8-.3581722-.8-.8v-10.2" />
        <path d="m4 28 10-10" />
        <g strokeLinejoin="round">
          <path d="m18 3h10c.5522847 0 1 .44771525 1 1v10" />
          <path d="m18 14 11-11" />
        </g>
      </g>
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={5.33333}
    >
      <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
    </svg>
  )
}

export function LocationSection() {
  const [showMoreHighlights, setShowMoreHighlights] = useState(false)
  const [mapFullscreenOpen, setMapFullscreenOpen] = useState(false)

  return (
    <section id="location-section" className="border-b border-border py-12">
      {/* Title + spacing */}
      <div className="mb-3">
        <h2
          tabIndex={-1}
          className="text-xl font-semibold text-foreground"
        >
          Where you&apos;ll be
        </h2>
      </div>

      {/* Location text */}
      <div className="mb-4 text-base text-foreground">
        Foça, İzmir, Turkey
      </div>

      {/* Map: clickable link to Google Maps + pin + fullscreen button */}
      <div className="relative mb-6 w-full overflow-hidden rounded-xl bg-muted">
        {/* Clickable map area - opens Google Maps in new tab */}
        <a
          href={GOOGLE_MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Show map - opens Google Maps"
          className="relative block w-full cursor-pointer"
        >
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
            {/* Static map: object-contain so full image is visible, no cropping */}
            <img
              src={STATIC_MAP_URL}
              alt="Map of Foça, İzmir, Turkey"
              className="h-full w-full object-contain"
              width={640}
              height={480}
            />
            {/* Pin overlay (centered) - pointer-events-none so clicks go to link */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-full items-center justify-center"
              aria-hidden
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff385c] text-white shadow-md">
                <MapPinIcon className="h-[22px] w-[22px]" />
              </div>
              <div
                className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 bg-[#ff385c] shadow-sm"
                style={{ borderRadius: 2 }}
              />
            </div>
          </div>
        </a>
        {/* Fullscreen map button (top right) - opens modal */}
        <button
          type="button"
          aria-label="Show fullscreen map"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-muted"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setMapFullscreenOpen(true)
          }}
        >
          <FullscreenIcon className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Fullscreen map modal */}
      {mapFullscreenOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Map fullscreen"
          onClick={() => setMapFullscreenOpen(false)}
        >
          <div
            className="relative h-full w-full max-h-[90vh] max-w-4xl overflow-hidden rounded-xl bg-background shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={EMBED_MAP_SRC}
              title="Map - Foça, İzmir, Turkey"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <button
              type="button"
              aria-label="Close map"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md transition-colors hover:bg-muted"
              onClick={() => setMapFullscreenOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* This listing's location is verified */}
      <div className="mb-6 flex flex-wrap items-center gap-1">
        <span className="text-sm text-foreground">
          This listing&apos;s location is verified.{" "}
        </span>
        <button
          type="button"
          className="text-sm font-semibold text-foreground underline underline-offset-2 hover:no-underline"
        >
          Learn more
        </button>
      </div>

      {/* Neighborhood highlights */}
      <div className="space-y-4">
        <h2
          tabIndex={-1}
          className="text-xl font-semibold text-foreground"
        >
          Neighborhood highlights
        </h2>
        <div
          className={`text-sm leading-6 text-muted-foreground ${
            showMoreHighlights ? "" : "line-clamp-3"
          }`}
        >
          🏞️ The vineyard houses every shade of green
          <br />
          🏔️ Earthquake fault lines can be seen
          <br />
          It houses its🦉 natural life with its living things
          <br />
          Distant and tranquil in🚫 city chaos
        </div>
        <button
          type="button"
          onClick={() => setShowMoreHighlights((v) => !v)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-foreground underline underline-offset-2 hover:no-underline"
        >
          {showMoreHighlights ? "Show less" : "Show more"}
          <span
            className={`inline-block h-3 w-3 transition-transform ${showMoreHighlights ? "rotate-180" : ""}`}
          >
            <ChevronRightIcon className="h-full w-full -rotate-90" />
          </span>
        </button>
      </div>
    </section>
  )
}
