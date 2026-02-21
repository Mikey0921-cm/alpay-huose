"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, Share2, Heart } from "lucide-react"

type PhotoItem = { src: string; alt: string }

// 使用你提供的 Airbnb 元素里的照片（a0.muscache.com）
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
    id: "living-room",
    title: "Living room",
    photos: [
      { src: img("e1b0ca92-6446-41dd-ab11-237a4b2fa158"), alt: "Living room with cozy modern decor" },
      { src: img("a3767b61-8c05-4dbd-82dd-2cd235e28145"), alt: "Living room view 2" },
      { src: img("e74e8116-7612-4ee4-ab81-ec77ad8e079b"), alt: "Living room view 3" },
      { src: img("a80f0016-b301-478c-bbec-9a8522037caf"), alt: "Living room view 4" },
    ],
    grid: "quad",
  },
  {
    id: "full-kitchen",
    title: "Full kitchen",
    photos: [
      { src: img("567cb598-ff82-4240-a074-0771bf4d9cc8"), alt: "Full kitchen" },
      { src: img("363002fa-af48-4e57-a590-ed8de16a521f"), alt: "Kitchen view 2" },
      { src: img("ba5d4f01-5593-4fed-9ea2-905939031905"), alt: "Kitchen view 3" },
    ],
    grid: "triple",
  },
  {
    id: "bedroom",
    title: "Bedroom",
    subtitle: ["King bed", "Double bed"],
    photos: [
      { src: img("f664b7f1-315c-46b2-8513-f7aad6ed17d9"), alt: "Bedroom" },
      { src: img("41ddc372-398c-4a79-82db-f74367e3f6a3"), alt: "Bedroom view 2" },
      { src: img("0c892942-49a3-47d7-8806-3639c832fc18"), alt: "Bedroom view 3" },
    ],
    grid: "triple",
  },
  {
    id: "full-bathroom",
    title: "Full bathroom",
    photos: [
      { src: img("8ab7e005-7e49-46e0-bf0e-9bd2264a0963"), alt: "Full bathroom" },
      { src: img("69540da7-7fd6-4aa3-a8f5-333018a98515"), alt: "Bathroom view 2" },
    ],
    grid: "double",
  },
  {
    id: "backyard",
    title: "Backyard",
    photos: [
      { src: img("df757d93-f9dc-499a-92e1-1d3d1460d100"), alt: "Backyard" },
      { src: img("3e0bd630-73f5-4951-bca3-90631a7e050a"), alt: "Backyard view 2" },
      { src: img("cc752cab-13d6-471c-9e15-de1993bc361c"), alt: "Backyard view 3" },
      { src: img("8c07e8ff-6db1-43c5-95c1-8462999a83db"), alt: "Backyard view 4" },
    ],
    grid: "quad",
  },
  {
    id: "patio",
    title: "Patio",
    photos: [{ src: img("a4967ade-f322-4146-bb3d-0e4d18e12d7e"), alt: "Patio" }],
    grid: "single",
  },
  {
    id: "exterior",
    title: "Exterior",
    photos: [
      { src: img("09e62e06-aabe-4fa1-85b4-684aa255daaf"), alt: "Exterior" },
      { src: img("6f14661e-a950-4381-8af7-e5b7bb6e1586"), alt: "Exterior view 2" },
      { src: img("7c7d5e36-3ef9-4ae7-bf8d-347b1f05f929"), alt: "Exterior view 3" },
    ],
    grid: "triple",
  },
  {
    id: "additional-photos",
    title: "Additional photos",
    photos: [
      { src: imgHosting("Hosting-49854509/original/09e9f150-2b2a-42ea-84df-8b6c3da389d3.jpeg"), alt: "Additional photo 1" },
      { src: img("a7735cdd-4a41-4c7c-9ac2-8b685b97a6d8"), alt: "Additional photo 2" },
      { src: img("3542f16d-9a9e-4e39-bebf-198aae664ac4"), alt: "Additional photo 3" },
      { src: img("40cc4323-58c5-4052-8d86-fb2ae995d667"), alt: "Additional photo 4" },
      { src: img("12e5cdbc-3617-4e04-9170-b2ff72e23879"), alt: "Additional photo 5" },
    ],
    grid: "quad",
  },
]

export function PhotoGallery() {
  const [modalOpen, setModalOpen] = useState(false)
  /** 弹层内当前选中的房间索引，用于显示该房间标题 + 照片列表 */
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [saved, setSaved] = useState(false)

  /** 点击某个房间缩略图时，打开全屏查看器并选中该房间 */
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
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-foreground md:text-2xl">Photo tour</h1>
        </div>

        {/* 横向房间缩略图：点击后弹出全屏照片查看器 */}
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

      {/* 全屏 Photo tour 弹层：顶部栏 + 房间条 + 当前房间标题与照片区域 */}
      {modalOpen && currentSection && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background">
          {/* 顶部栏：返回 | Photo tour | Share, Save */}
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

          {/* 横向房间缩略图条 */}
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

          {/* 当前房间标题 + 照片区域（可滚动） */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1120px] px-4 py-6 md:px-6 md:py-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground md:text-2xl">{currentSection.title}</h2>
              {currentSection.subtitle && currentSection.subtitle.length > 0 && (
                <p className="mb-4 text-sm text-muted-foreground">
                  {currentSection.subtitle.join(" · ")}
                </p>
              )}
              <div className="space-y-4">
                {/* 第一张大幅 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-secondary">
                  <Image
                    src={currentSection.photos[0].src}
                    alt={currentSection.photos[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1120px"
                  />
                </div>
                {/* 其余照片网格 */}
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
