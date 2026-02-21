export type ListingSummary = {
  id: string
  slug: string
  title: string
  location: string
  pricePerNightUsd: number
  rating: number
  reviewsCount: number
  thumbnail: string
}

export const LISTINGS: ListingSummary[] = [
  {
    id: "olive-grove-retreat-foca",
    slug: "olive-grove-retreat-foca",
    title: "Olive Grove Retreat - Foça",
    location: "Foça, İzmir, Turkey",
    pricePerNightUsd: 51,
    rating: 4.92,
    reviewsCount: 128,
    // 使用当前相册中的一张主图
    thumbnail: "im/pictures/e1b0ca92-6446-41dd-ab11-237a4b2fa158.jpg",
  },
  {
    id: "second-house",
    slug: "second-house",
    title: "Tiny home in Foça, Turkey",
    location: "Foça, İzmir, Turkey",
    pricePerNightUsd: 54,
    rating: 4.59,
    reviewsCount: 71,
    thumbnail: "im/pictures/5d1d2b29-94e9-4d21-ad6d-7aa256979bf9.jpg",
  },
  {
    id: "third-house",
    slug: "third-house",
    title: "Crissy - Siri House Keyif House",
    location: "İzmir, Turkey",
    pricePerNightUsd: 138,
    rating: 4.9,
    reviewsCount: 89,
    thumbnail: "im/pictures/09e62e06-aabe-4fa1-85b4-684aa255daaf.jpg",
  },
]

