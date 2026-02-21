"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, Share2 } from "lucide-react"

type PhotoItem = { src: string; alt: string }

const imgHosting = (id: string, w = 1200) =>
  `https://a0.muscache.com/im/pictures/hosting/Hosting-1204811780131638732/original/${id}.jpeg?im_w=${w}`

const photoTourSections: {
  id: string
  title: string
  subtitle?: string[]
  photos: PhotoItem[]
  grid: "single" | "double" | "triple" | "quad"
}[] = [
  {
    id: "living-room",
    title: "Living room",
    photos: [
      { src: imgHosting("dab3bfeb-8ca3-443a-af0c-5e89797ff7f3"), alt: "Living room with modern decor" },
      { src: imgHosting("efc23931-3a84-426c-8ab5-7d1dc16f698f"), alt: "Living room view 2" },
      { src: imgHosting("8586f3b3-b3c4-4e2e-bc01-d637999f30f1"), alt: "Living room view 3" },
    ],
    grid: "triple",
  },
  {
    id: "full-kitchen",
    title: "Full kitchen",
    photos: [
      { src: imgHosting("1b8c8a3e-3370-4ad9-817f-aa8a5515e456"), alt: "Full kitchen" },
    ],
    grid: "single",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    photos: [
      { src: imgHosting("db3773ac-43d9-4c32-b83c-a7206a81d668"), alt: "Bedroom" },
      { src: imgHosting("d4cd6a55-f977-4c1f-a271-94a1ae4f92f1"), alt: "Bedroom view 2" },
      { src: imgHosting("c5a664d1-c387-4542-a491-a1d2379fa30e"), alt: "Bedroom view 3" },
      { src: imgHosting("64ee3253-b66d-48f8-a5ab-6233723787e6"), alt: "Bedroom view 4" },
      { src: imgHosting("f6c257d5-3ecb-42b1-a5d3-95c7769a0982"), alt: "Bedroom view 5" },
      { src: imgHosting("2ec4c68f-559a-4564-b124-716591189a78"), alt: "Bedroom view 6" },
    ],
    grid: "quad",
  },
  {
    id: "full-bathroom",
    title: "Full bathroom",
    photos: [
      { src: imgHosting("921accc0-a0b8-4ee5-a1ff-c5b5a4324152"), alt: "Full bathroom" },
    ],
    grid: "single",
  },
  {
    id: "exterior",
    title: "Exterior",
    photos: [
      { src: imgHosting("4283db5b-e7fb-4185-9528-86d1790fcfcb"), alt: "Exterior" },
      { src: imgHosting("d2c55ef2-51cd-4714-88a4-f58f54288cda"), alt: "Exterior view 2" },
      { src: imgHosting("5d7a5d03-b5d1-4766-aa07-60df39a49ae0"), alt: "Exterior view 3" },
      { src: imgHosting("6109a8a4-e36e-4be7-b68b-0171c6fa0dbf"), alt: "Exterior view 4" },
      { src: imgHosting("6abf231e-6910-489d-9148-4a204eace5a0"), alt: "Exterior view 5" },
      { src: imgHosting("33998215-7f51-436d-a595-e6d13566caef"), alt: "Exterior view 6" },
      { src: imgHosting("9023dbef-61f6-4f3a-ba24-6bfbe798b417"), alt: "Exterior view 7" },
    ],
    grid: "quad",
  },
]

export function PhotoGalleryThirdHouse() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)

  const openModalAtSection = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex)
    setModalOpen(true)
  }

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false)
    }
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKey)
    }
  }, [modalOpen])

  const currentSection = photoTourSections[currentSectionIndex]

  return (
    <>
      <div className="relative mb-8" data-testid="photo-viewer-overview">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-foreground md:text-2xl">Photo tour</h1>
        </div>

        <div className="_1wy9a3l -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex gap-3 pb-2 md:gap-4">
            {photoTourSections.map((section, sectionIndex) => (
              <button
                key={section.id}
                type="button"
                aria-label={`View ${section.title} photos`}
                onClick={() => openModalAtSection(sectionIndex)}
                className="flex min-w-[100px] flex-col items-center gap-2 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={section.photos[0].src}
                    alt={`${section.title} thumbnail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 120px, 120px"
                    priority={sectionIndex === 0}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && currentSection && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background">
          {/* Header with Close and Share buttons */}
          <header className="flex shrink-0 items-center justify-between px-4 py-3 md:px-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary/50"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  className="h-4 w-4"
                  style={{ fill: "none", stroke: "currentColor", strokeWidth: 4, overflow: "visible" }}
                >
                  <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4" />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary/50"
                aria-label="Share"
              >
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  className="h-4 w-4"
                  style={{ fill: "none", stroke: "currentColor", strokeWidth: 2, overflow: "visible" }}
                >
                  <path
                    d="m27 18v9c0 1.1046-.8954 2-2 2h-18c-1.10457 0-2-.8954-2-2v-9m11-15v21m-10-11 9.2929-9.29289c.3905-.39053 1.0237-.39053 1.4142 0l9.2929 9.29289"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Section thumbnails */}
          <div className="shrink-0 border-b border-border bg-background">
            <div className="overflow-x-auto px-4 py-3 md:px-6">
              <div className="flex gap-4">
                {photoTourSections.map((section, sectionIndex) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setCurrentSectionIndex(sectionIndex)}
                    className={`flex min-w-[90px] flex-col items-center gap-2 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      sectionIndex === currentSectionIndex ? "opacity-100" : "opacity-70"
                    }`}
                    aria-label={`View ${section.title}`}
                    aria-current={sectionIndex === currentSectionIndex ? "true" : undefined}
                  >
                    <div className="relative aspect-square w-full max-w-[100px] overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={section.photos[0].src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground md:text-sm">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo content area */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground md:text-2xl">{currentSection.title}</h2>
              {currentSection.subtitle && currentSection.subtitle.length > 0 && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {currentSection.subtitle.join(" · ")}
                </p>
              )}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={currentSection.photos[0].src}
                    alt={currentSection.photos[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1120px"
                  />
                </div>
                {currentSection.photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {currentSection.photos.slice(1).map((photo, i) => (
                      <div
                        key={i}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 540px"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
