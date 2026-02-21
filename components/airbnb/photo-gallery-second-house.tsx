"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart } from "lucide-react"

type PhotoItem = { src: string; alt: string }

// 使用第二套房子的照片（a0.muscache.com）
const img = (id: string, w = 1200) =>
  `https://a0.muscache.com/im/pictures/${id}.jpg?im_w=${w}`
const imgHosting = (path: string, w = 1200) =>
  `https://a0.muscache.com/im/pictures/hosting/${path}?im_w=${w}`

const photoTourSections: {
  id: string
  title: string
  subtitle?: string[]
  photos: PhotoItem[]
  grid: "single" | "double" | "triple" | "quad"
}[] = [
  {
    id: "main",
    title: "Main space",
    photos: [
      { src: img("5d1d2b29-94e9-4d21-ad6d-7aa256979bf9"), alt: "Main space view" },
      { src: img("a57f45ed-c5a5-47b6-8527-9d20e1c68e61"), alt: "Main space view 2" },
      { src: img("0adf570d-ed08-49b2-8fdf-758d25b58afd"), alt: "Main space view 3" },
      { src: img("062872a0-80c7-4200-97a4-fbf0bfb13bc6"), alt: "Main space view 4" },
    ],
    grid: "quad",
  },
  {
    id: "living-area",
    title: "Living area",
    photos: [
      { src: img("ef2870bc-ba08-4583-a78c-5879ca992a65"), alt: "Living area" },
      { src: img("1cf739d7-8d74-47eb-bc41-c469d9c47282"), alt: "Living area view 2" },
      { src: img("caea0d7f-b6ab-406f-b9bc-7db45ac4d8ce"), alt: "Living area view 3" },
    ],
    grid: "triple",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    photos: [
      { src: img("479ae489-3654-4166-a490-4a18767e1254"), alt: "Bedroom" },
      { src: img("b3f17633-c6f7-45c8-93e0-ad0b975c6c9d"), alt: "Bedroom view 2" },
      { src: img("b3884ca3-625f-479a-b0c5-09ecd53823be"), alt: "Bedroom view 3" },
    ],
    grid: "triple",
  },
  {
    id: "bathroom",
    title: "Bathroom",
    photos: [
      { src: img("efd122e2-df29-4119-a21e-e0c203566c48"), alt: "Bathroom" },
      { src: img("df000c42-448f-4e7e-9ff9-62a4ecf9e3d6"), alt: "Bathroom view 2" },
    ],
    grid: "double",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    photos: [
      { src: img("f7378a49-9527-4b4e-9d04-cae002153fe9"), alt: "Kitchen" },
      { src: img("544295bf-a53b-4c84-a5ec-85f755868c4d"), alt: "Kitchen view 2" },
      { src: img("97347eaa-0f83-4d0a-8ec4-4014915207bd"), alt: "Kitchen view 3" },
    ],
    grid: "triple",
  },
  {
    id: "outdoor",
    title: "Outdoor space",
    photos: [
      { src: img("7f250c57-356e-4dae-a82b-1e7669d3abc3"), alt: "Outdoor space" },
      { src: img("1c0ff395-e366-4316-b75a-621d86cc6961"), alt: "Outdoor view 2" },
      { src: img("ddeb407f-ea91-4a88-a3e4-3e77340eb5a7"), alt: "Outdoor view 3" },
      { src: img("d283dabf-dbf0-4db3-b3c7-d4d39261391d"), alt: "Outdoor view 4" },
    ],
    grid: "quad",
  },
  {
    id: "additional",
    title: "Additional photos",
    photos: [
      { src: img("55fd0a7f-f8ef-483a-8223-90edc06af9b7"), alt: "Additional photo 1" },
      { src: img("6ce961f6-08bb-4c2e-b72f-ea1599ed8c9e"), alt: "Additional photo 2" },
      { src: img("342ace2e-54dd-4424-b369-93b47754aea2"), alt: "Additional photo 3" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/5faa2f97-36ec-4250-846f-2f1efc639816.jpeg"), alt: "Additional photo 4" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/1e73ed95-c8b4-4823-8129-7763ebacc05a.jpeg"), alt: "Additional photo 5" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/9a6f6026-8eae-4022-b423-3fc0a5d85f63.jpeg"), alt: "Additional photo 6" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/6f3ec165-42de-455f-88b1-58eb646865e2.jpeg"), alt: "Additional photo 7" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/64b68f3c-d171-4667-9269-0c7614b7e9ed.jpeg"), alt: "Additional photo 8" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/5b790080-8b38-4d20-9272-847e8e574b3d.jpeg"), alt: "Additional photo 9" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/fbbec39d-eb01-41ef-ae7a-d26f1740fc55.jpeg"), alt: "Additional photo 10" },
      { src: imgHosting("Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTAwNTkyMDY5NDI3NjE0NDY4/original/6efaaa53-da3c-48c0-a942-ced97b80b25a.jpeg"), alt: "Additional photo 11" },
    ],
    grid: "quad",
  },
]

export function PhotoGallerySecondHouse() {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [saved, setSaved] = useState(false)

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
          <header className="flex shrink-0 items-center border-b border-border px-4 py-3 md:px-6">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
              aria-label="Close photo tour"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="min-w-0 flex-1 text-center text-lg font-semibold text-foreground md:text-xl">Photo tour</h1>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary ${
                  saved ? "text-primary" : "text-foreground"
                }`}
                aria-label={saved ? "Unsave" : "Save"}
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </header>

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
