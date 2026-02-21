"use client"

import Image from "next/image"
import { Star, X, Search } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/i18n/language-context"

const reviewCategoryIcon = (id: string) =>
  `https://a0.muscache.com/im/pictures/AirbnbPlatformAssets/AirbnbPlatformAssets-Review-AI-Synthesis/original/${id}.png?im_w=240`

// 对应 Airbnb「Guest reviews mention」里的标签和数量
const reviewCategories = [
  { label: "Bathroom", count: 5, icon: reviewCategoryIcon("aaf8701c-bfe8-4d81-a168-e62cf1efb091") },
  { label: "Hospitality", count: 10, icon: reviewCategoryIcon("b5957392-bf60-4304-8666-c030859eebf7") },
  { label: "Location", count: 5, icon: reviewCategoryIcon("481a6680-46b2-4c94-91e9-d7917d97b660") },
  { label: "Kitchen", count: 3, icon: reviewCategoryIcon("befe29c5-d938-4046-a6bb-a79e3ac5656d") },
  { label: "Value", count: 3, icon: reviewCategoryIcon("bb69de63-2006-4a46-b22a-b466689af21a") },
  { label: "Accuracy", count: 2, icon: reviewCategoryIcon("b0dbbf5c-02a9-4781-a3ad-cf6953beccdc") },
  { label: "Getting around", count: 2, icon: reviewCategoryIcon("1d5a4065-220e-4d80-b44f-019dd4a0ae68") },
  { label: "Cleanliness", count: 2, icon: reviewCategoryIcon("b0d9a4f0-26d1-4d4d-a269-4884338ab168") },
  { label: "Indoor spaces", count: 2, icon: reviewCategoryIcon("8ab51c28-bc4b-464e-8e54-f391fc36f132") },
]

const userAvatar = (id: string) =>
  `https://a0.muscache.com/im/pictures/user/User/original/${id}.jpeg?im_w=240`
const userAvatarJpg = (id: string) =>
  `https://a0.muscache.com/im/pictures/user/${id}.jpg?im_w=240`

// 无 muscache 头像时用姓名生成头像（仅保留字母数字空格）
const placeholderAvatar = (name: string) => {
  const safe = name.replace(/[^a-zA-Z0-9\s]/g, "").trim() || "G"
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(safe)}&size=96&background=94a3b8&color=fff`
}

const reviews = [
  {
    name: "Ayla",
    subtitle: "4 years on Airbnb",
    stars: 5,
    date: "September 2025",
    text: "The stay was really very nice! The accommodation was exactly as described and very pleasant. Alpay is a very nice host – helpful, friendly and always available. I felt completely comfortable and thank you very much for the wonderful time. Highly recommended!",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User-444293638/original/2ab62e9e-8c30-4bb3-995c-fd81060a2f51.jpeg?im_w=240",
  },
  {
    name: "Berk",
    subtitle: "Foça, Türkiye",
    stars: 4,
    date: "September 2025",
    text: "Mr. Alpay helped with everything. He took care of our problems. It's a place far from the center, ideal for relaxing. There were a lot of cats and dogs, but we weren't bothered by that. It was a simple and beautiful experience.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User/original/44cbc2c3-de8e-423c-b3a0-d782fc4b1b61.jpeg?im_w=240",
  },
  {
    name: "Yunus",
    subtitle: "2 years on Airbnb",
    stars: 4,
    date: "September 2025",
    text: "It is an ideal place for those who want to stay in nature and very close to the center of Foça. The house is in an olive grove garden. The host has dogs, but they're not aggressive. We were satisfied and had no problems.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User/original/9a804b06-13eb-4f4f-961a-f1eec1c0f0c0.jpeg?im_w=240",
  },
  {
    name: "YiĞItbey",
    subtitle: "İzmir, Türkiye",
    stars: 5,
    date: "August 2025",
    text: "It was a caring, relevant host. The house was very clean and there was everything you might need. Thank you for everything.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User-579386119/original/6f077aac-b351-49cb-ba41-d169e3fab746.jpeg?im_w=240",
  },
  {
    name: "Zuhal",
    subtitle: "Fatsa, Türkiye",
    stars: 5,
    date: "August 2025",
    text: "Mr. Alpay was a very friendly and sweet person. We would love to chat with him more, but we stayed for 2 days and had limited time. I would go again if I come this way again. There were minor inconveniences, but things that could be made up for. My advice for the future is to watch the sky here – it is amazing.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User/original/2c5a9f20-41cb-4d2f-9f70-9af7a29afe94.jpeg?im_w=240",
  },
  {
    name: "Ayberk",
    subtitle: "Manisa, Türkiye",
    stars: 4,
    date: "August 2025",
    text: "Mr. Alpay was a very caring, kind and understanding host. The location of the house was great, a very nice place for those looking for quiet peace in nature. It was nice to have your own garden area, but the spider webs on the ceiling inside the house should be cleaned more often.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/f7c58bf4-e1b9-4914-be22-8254748689cd.jpg?im_w=240",
  },
  {
    name: "Bayram",
    subtitle: "İzmir, Türkiye",
    stars: 2,
    date: "March 2025",
    text: "First of all, thank you to Mr. Alpay. There is a jacuzzi in the house, but there is no water, the air conditioner does not heat properly, and the refrigerator was not working when we arrived. The bed was not comfortable and there was a foul smell in the bathroom. There were too many dogs around and it was noisy. Bird sounds, nature and the fireplace are beautiful details, but overall we were not very satisfied.",
    avatar: placeholderAvatar("Bayram"),
  },
  {
    name: "İrfan",
    subtitle: "3 years on Airbnb",
    stars: 5,
    date: "July 2025",
    text: "He was a very well‑mannered and polite host. All we lacked was hot water, everything else was magnificent.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User-498033306/original/6ce73712-c985-42ed-b2ca-c5470ba20c20.jpeg?im_w=240",
  },
  {
    name: "Muhammet",
    subtitle: "4 months on Airbnb",
    stars: 3,
    date: "October 2025",
    text: "Like good.",
    avatar: placeholderAvatar("Muhammet"),
  },
  {
    name: "Yusuf",
    subtitle: "İzmir, Türkiye",
    stars: 5,
    date: "March 2025",
    text: "It is a beautiful place in touch with nature, 3 minutes to the vineyard center by car and 10 minutes to Foça. Very calm and peaceful.",
    avatar: placeholderAvatar("Yusuf"),
  },
  {
    name: "İbrahim",
    subtitle: "İzmir, Türkiye",
    stars: 5,
    date: "August 2024",
    text: "It was as it was in the photos. We had a peaceful time among the olive trees. Kitchen supplies were enough, but it would be much nicer if they could be increased. Thank you for being a nice host to Mr. Alpay.",
    avatar: placeholderAvatar("İbrahim"),
  },
  {
    name: "Özgür K.",
    subtitle: "İzmir, Türkiye",
    stars: 4,
    date: "December 2024",
    text: "We stayed for 2 days in a calm and peaceful environment. We would also like to thank Mr. Alpay for his interest and gifts. We will go again.",
    avatar: placeholderAvatar("Özgür K."),
  },
  {
    name: "Niyazi",
    subtitle: "3 years on Airbnb",
    stars: 5,
    date: "November 2024",
    text: "Decoration and atmosphere make it a peaceful home where you will forget everything you can see in Izmir, with nature and animals all around.",
    avatar: placeholderAvatar("Niyazi"),
  },
  {
    name: "Murat",
    subtitle: "1 year on Airbnb",
    stars: 2,
    date: "February 2025",
    text: "The service provided was not worth the money. The bathroom smells and the hot water shortage was significant.",
    avatar: placeholderAvatar("Murat"),
  },
  {
    name: "Tanem",
    subtitle: "İstanbul, Türkiye",
    stars: 2,
    date: "April 2025",
    text: "We were not at all satisfied, honestly.",
    avatar: placeholderAvatar("Tanem"),
  },
  {
    name: "Hilal",
    subtitle: "Antalya, Türkiye",
    stars: 5,
    date: "November 2024",
    text: "It was a great experience where we woke up to the sounds of birds in touch with nature and our furry friends. It's a great place to relax. I recommend it to anyone who wants to listen to themselves.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User-567314066/original/fdf7f75a-2c4d-4780-9d8e-9c965338456c.jpeg?im_w=240",
  },
  {
    name: "Meltem",
    subtitle: "Kuşadası, Türkiye",
    stars: 5,
    date: "September 2024",
    text: "The interior of the house we stayed in was perfect. It is clear that they took care of every detail. There are a lot of animals around, all very sweet and affectionate. A paradise for an animal lover; everything was beautiful.",
    avatar:
      "https://a0.muscache.com/im/pictures/user/User/original/294401d1-2101-4795-a025-2d702431de0d.jpeg?im_w=240",
  },
  {
    name: "Övgü",
    subtitle: "3 years on Airbnb",
    stars: 5,
    date: "November 2024",
    text: "Decoration and atmosphere create a peaceful home where you will forget the city, surrounded by nature and animals. A wonderful place to relax.",
    avatar: placeholderAvatar("Övgü"),
  },
]

function StarRating({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Rating, ${n} stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= n ? "fill-foreground text-foreground" : "fill-muted text-muted-foreground"}`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedReview, setExpandedReview] = useState<string | null>(null)

  const filteredReviews = searchQuery
    ? reviews.filter(
        (r) =>
          r.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : reviews

  return (
    <>
      <div id="reviews-section" className="border-b border-border py-12">
        {/* Overall Rating */}
        <div className="mb-2 flex items-center gap-2">
          <Star className="h-5 w-5 fill-foreground text-foreground" />
          <span className="text-xl font-semibold text-foreground">
            Rated 4.33 out of 5 stars.
          </span>
        </div>
        <div className="mb-2 text-muted-foreground" aria-hidden="true">
          4.33 · 24 reviews
        </div>

        {/* Bottom 10% note */}
        <p className="mb-4 text-sm text-muted-foreground">
          This home is in the <span className="font-medium text-foreground">bottom 10%</span> of
          eligible listings based on ratings, reviews, and reliability
        </p>

        {/* How reviews work */}
        <button
          type="button"
          className="mb-8 text-sm font-medium text-foreground underline transition-colors hover:text-muted-foreground"
        >
          How reviews work
        </button>

        {/* Category pills with icons */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {reviewCategories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              className="flex flex-shrink-0 items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <Image
                src={cat.icon}
                alt=""
                width={25}
                height={25}
                className="rounded-none object-contain"
              />
              <span className="font-medium">{cat.label}</span>
              <span className="text-muted-foreground">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Search Reviews */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-border px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("reviews.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} aria-label="Clear search">
              <X className="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredReviews.slice(0, 6).map((review) => {
            const isExpanded = expandedReview === review.name + review.date
            return (
              <div key={review.name + review.date}>
                <div className="mb-3 flex items-start gap-3">
                  {review.avatar ? (
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                      {review.name.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.subtitle}</p>
                  </div>
                </div>
                <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <StarRating n={review.stars} />
                  <span> · </span>
                  <span>{review.date}</span>
                </div>
                <p
                  className={`text-sm leading-relaxed text-foreground ${!isExpanded ? "line-clamp-4" : ""}`}
                >
                  {review.text}
                </p>
                {review.text.length > 180 && (
                  <button
                    className="mt-1 text-sm font-medium text-foreground underline transition-colors hover:text-muted-foreground"
                    onClick={() =>
                      setExpandedReview(isExpanded ? null : review.name + review.date)
                    }
                  >
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {filteredReviews.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No reviews match your search.
          </p>
        )}

        {/* Show all button */}
        <button
          className="mt-8 rounded-lg border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          onClick={() => setShowModal(true)}
        >
          Show all 24 reviews
        </button>
      </div>

      {/* All Reviews Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-background p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute left-4 top-4 rounded-full p-1 transition-colors hover:bg-secondary"
              onClick={() => setShowModal(false)}
              aria-label="Close reviews"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>

            <div className="mb-6 flex items-center gap-2 pt-2">
              <Star className="h-5 w-5 fill-foreground text-foreground" />
              <span className="text-lg font-semibold text-foreground">4.72 · 142 reviews</span>
            </div>

            <div className="flex flex-col gap-6">
              {reviews.map((review) => (
                <div
                  key={review.name + review.date}
                  className="border-b border-border pb-6 last:border-b-0"
                >
                  <div className="mb-3 flex items-start gap-3">
                    {review.avatar ? (
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                        {review.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.subtitle}</p>
                    </div>
                  </div>
                  <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <StarRating n={review.stars} />
                    <span> · </span>
                    <span>{review.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
