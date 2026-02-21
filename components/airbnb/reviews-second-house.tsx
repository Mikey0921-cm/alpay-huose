"use client"

import Image from "next/image"
import { Star, X, Search } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/i18n/language-context"

const reviewCategoryIcon = (id: string) =>
  `https://a0.muscache.com/im/pictures/AirbnbPlatformAssets/AirbnbPlatformAssets-Review-AI-Synthesis/original/${id}.png?im_w=240`

const reviewCategories = [
  { label: "Cleanliness", count: 25, icon: reviewCategoryIcon("b0d9a4f0-26d1-4d4d-a269-4884338ab168") },
  { label: "Hospitality", count: 37, icon: reviewCategoryIcon("b5957392-bf60-4304-8666-c030859eebf7") },
  { label: "Air conditioning", count: 6, icon: reviewCategoryIcon("48c921d7-4ed2-4f0d-a472-aacae7fce27c") },
  { label: "Location", count: 20, icon: reviewCategoryIcon("481a6680-46b2-4c94-91e9-d7917d97b660") },
  { label: "Outdoor spaces", count: 12, icon: reviewCategoryIcon("0fe05949-55ff-49f7-8c91-3f9332e1a681") },
  { label: "Accuracy", count: 8, icon: reviewCategoryIcon("b0dbbf5c-02a9-4781-a3ad-cf6953beccdc") },
  { label: "Quiet", count: 7, icon: reviewCategoryIcon("a2fd9fca-1d70-4c5b-9d37-82ab17cccd79") },
  { label: "Heating", count: 2, icon: reviewCategoryIcon("05b44f2b-179d-415c-b2ef-c0d7e49f8d13") },
  { label: "Getting around", count: 5, icon: reviewCategoryIcon("1d5a4065-220e-4d80-b44f-019dd4a0ae68") },
  { label: "Noise", count: 3, icon: reviewCategoryIcon("faae423e-4ee2-41eb-a1b7-24d66242a9de") },
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
    name: "Mohanad",
    subtitle: "3 years on Airbnb",
    stars: 5,
    date: "August 2025",
    text: "Thanks to Mr. Alpay for hosting us. He was a nice person and the house is great. It just needs a little cleaning.",
    avatar: userAvatar("b12af047-be1b-4e7a-b026-091c3bb6957d"),
  },
  {
    name: "Raul",
    subtitle: "7 years on Airbnb",
    stars: 5,
    date: "May 2025",
    text: "Many thanks, Alpay and family for your hospitality. We enjoyed very much the time we spent at your place, very relaxing and beautiful place to spend time surrounded by olive trees and animals. We plan to visit you again soon.",
    avatar: userAvatarJpg("7b643f4a-2d3e-4afd-a364-9e17d459bce3"),
  },
  {
    name: "Musa",
    subtitle: "Denizli, Türkiye",
    stars: 5,
    date: "October 2025",
    text: "The most important thing that made this stay special was our host Mr. Alpay. He responded to all our questions instantly and did his best to make sure we had a comfortable stay. The hostel itself was very clean and comfortable, but Mr. Alpay's hospitality made our experience unforgettable. When you have a business like this, your vacation is definitely more enjoyable. Thank you so much for everything. I would definitely recommend it",
    avatar: placeholderAvatar("Musa"),
  },
  {
    name: "Emine",
    subtitle: "4 years on Airbnb",
    stars: 5,
    date: "September 2025",
    text: "We had a very calm and peaceful stay. There are even board games with every detail thought out. We chose to stay for a day, but we wished we had the opportunity to spend days here. Thank you for the lovely experience.",
    avatar: placeholderAvatar("Emine"),
  },
  {
    name: "Hüsra",
    subtitle: "İstanbul, Türkiye",
    stars: 4,
    date: "July 2025",
    text: "A peaceful place was a beautiful experience.\n Mr. Alpay was also a pleasant conversationalist, he communicated well with us during the check-in. The house was clean.\nWe only had trouble with the curtains, we couldn't move comfortably because they were only tulle. \nYes, the environment was surrounded by trees, there was no one coming and going, it was quiet, but we still felt the need to close it for the evening. As a result, it was a place where we left happy",
    avatar: placeholderAvatar("Hüsra"),
  },
  {
    name: "Mustafa",
    subtitle: "Karaman, Turkey",
    stars: 4,
    date: "May 2025",
    text: "Quiet and pleasant. The air conditioning was not working properly, but we warmed up with the fireplace. Once, the water stopped working for a short time. Other than that, Ms. Sila was helpful. We were greeted very politely and friendly. You should not forget that there is a garden house in the olive grove and create expectations accordingly. I would not recommend it to those who are obsessed with small amounts of dust, flies, insects.",
    avatar: placeholderAvatar("Mustafa"),
  },
  {
    name: "Sultan Demirel",
    subtitle: "2 years on Airbnb",
    stars: 5,
    date: "August 2025",
    text: "I would like to thank Mr. Alpay and Ms. Sıla very much.\nThey were very helpful with transportation \nAnd when there was a need and a problem, they responded immediately.\nThe house is located in a very quiet and peaceful location \nIt was as it appeared in the image.",
    avatar: placeholderAvatar("Sultan Demirel"),
  },
  {
    name: "Eda",
    subtitle: "2 years on Airbnb",
    stars: 5,
    date: "August 2025",
    text: "Mr. Alpay was very interested from the beginning. We went with our pet. The cleanliness of the room was very good. Everything in the room was down to the finest detail. Iron, ironing board, book, hair dryer, kitchenware, etc... You feel like you are in a house with a private garden\nIt was a great courtesy for us to turn on the air conditioner in the room before us and cool the room. Because it was great for our pet. He offered us something to drink and told us what we could do around.\nIt's a place I can choose for my next vacation. I recommend it to everyone.",
    avatar: placeholderAvatar("Eda"),
  },
  {
    name: "İnn",
    subtitle: "Bursa, Turkey",
    stars: 5,
    date: "June 2025",
    text: "It is a place that can be preferred if you want to relax in a quiet, calm and peaceful environment; it is in the style of a hobbit house and beautifully decorated. I guess there's nothing like having dinner in a very pleasant garden and retiring to rest. Thank you for everything, Ms. Sıla and Mr. Alpay.",
    avatar: placeholderAvatar("İnn"),
  },
  {
    name: "Seymen",
    subtitle: "3 years on Airbnb",
    stars: 3,
    date: "March 2025",
    text: "I think the most important detail is that this listing includes a place like a resort, not a single house. As far as I can see, there are 3 houses and the house they gave us was not the house in the image. When we asked for it, they requested a price difference. Plus, the cleanliness was really lacking. The floors are dirty, the kitchen utensils are dirty and missing. Finding the exact location is a bit of a challenge, but Mr. Alpay will help. But it's a nice place. Green, calm, animal-friendly… even a little too animal-friendly. If your door knocks at night, don't be afraid, they are cats.",
    avatar: placeholderAvatar("Seymen"),
  },
  {
    name: "Göksel",
    subtitle: "İzmir, Türkiye",
    stars: 5,
    date: "September 2025",
    text: "The host was very caring . A peaceful place in the quiet nature. We definitely recommend it",
    avatar: placeholderAvatar("Göksel"),
  },
  {
    name: "Süleyman",
    subtitle: "6 years on Airbnb",
    stars: 3,
    date: "July 2025",
    text: "It needs some maintenance. The environment is very good. Dogs come out everywhere. They are harmless, but some people may be afraid. I heated water in the teapot, there was louse tea in it, I left without cleaning it (I apologize). I was told that the teapot was trash. They asked for money, saying that the new one was 1200 TL. Actually, it's ridiculous that a situation that needs to be cleaned up has come to this point. This attitude was not nice. I see it as opportunism. If he had texted me instead saying that I left without cleaning the teapot, I would have written a letter of apology in return. This attitude upset me. I will delete this place, which I was thinking of staying at again, from my list and I will not recommend it to my friends.",
    avatar: placeholderAvatar("Süleyman"),
  },
  {
    name: "Maren",
    subtitle: "10 years on Airbnb",
    stars: 5,
    date: "July 2025",
    text: "We are on our way from the Netherlands to Karataș Turkey with our Defender and by chance ended up at this Hobbit house via Airbnb. We especially enjoyed the tranquility and coziness of all the animals",
    avatar: placeholderAvatar("Maren"),
  },
  {
    name: "Okan",
    subtitle: "İzmit, Türkiye",
    stars: 3,
    date: "May 2025",
    text: "The only problem in the house was pollution. Everything was quite dusty and dirty. Maybe this problem occurred because we were the first guests of the season. \nThe toilet, kitchen, bedroom were dusty and dirty…",
    avatar: placeholderAvatar("Okan"),
  },
  {
    name: "Zeynep Nural",
    subtitle: "2 years on Airbnb",
    stars: 4,
    date: "July 2025",
    text: "We stayed for 1 night, but we would like to stay for at least 2 nights. The house was very peaceful. Especially the garden... It was a pleasure to stay among the olive trees. I can only say that there was a very small, tolerable cleaning problem. Other than that, if I ever come to Foça again, I'd stay here again. It's quite affordable. The place is located between Yeni Foça and Eski Foça. It was good in terms of location. You can get to all the markets you want with a 5-minute drive. There are very sweet cats and dogs in the garden of the house. You can be sure that you will feel at home and relax. Since Foça is generally windy, sometimes strange sounds can be heard from outside. I should also mention that. There's also a barbecue in the garden. I saw the comments that the air conditioner was broken, but it works fine. Thanks to the host, he had turned it on before we arrived and we entered a cool house. We also thank him for allowing us to enter before the check-in time.",
    avatar: placeholderAvatar("Zeynep Nural"),
  },
  {
    name: "Erkan",
    subtitle: "İzmir, Türkiye",
    stars: 5,
    date: "November 2025",
    text: "A peaceful, beautiful, clean place",
    avatar: placeholderAvatar("Erkan"),
  },
  {
    name: "Yusuf",
    subtitle: "6 months on Airbnb",
    stars: 2,
    date: "August 2025",
    text: "Don't expect too much. It's not suitable for meticulous people.",
    avatar: placeholderAvatar("Yusuf"),
  },
  {
    name: "Şinasi Duman",
    subtitle: "Izmir, Turkey",
    stars: 5,
    date: "August 2025",
    text: "Away from people, among olive trees, very suitable for those who seek calm and tranquility",
    avatar: placeholderAvatar("Şinasi Duman"),
  },
  {
    name: "Pietro",
    subtitle: "11 years on Airbnb",
    stars: 5,
    date: "August 2025",
    text: "A delightful, dreamy rural cottage, surrounded by greenery, welcomed by the affection of kittens, dogs and the excellent landlord",
    avatar: placeholderAvatar("Pietro"),
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

export function ReviewsSecondHouse() {
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
          <h2 className="text-xl font-semibold text-foreground">
            4.59 out of 5 stars from 71 reviews
          </h2>
        </div>
        <div className="mb-2 text-muted-foreground" aria-hidden="true">
          4.59 · 71 reviews
        </div>

        {/* Bottom 10% note */}
        <div className="mb-4 rounded-lg border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">
            This home is in the <span className="font-medium text-foreground">bottom 10%</span> of
            eligible listings based on ratings, reviews, and reliability
          </p>
        </div>

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

        {/* Review Cards - Horizontal Scroll */}
        <div className="mb-4">
          <div className="mb-2 text-sm text-muted-foreground">
            {Math.min(filteredReviews.length, 10)} of {filteredReviews.length} items showing
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {filteredReviews.slice(0, 10).map((review) => {
              const isExpanded = expandedReview === review.name + review.date
              const shouldTruncate = review.text.length > 200
              return (
                <div
                  key={review.name + review.date}
                  className="flex-shrink-0 rounded-lg border border-border bg-background p-4"
                  style={{ width: "min(100%, 400px)", minHeight: "196px" }}
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
                    className={`text-sm leading-relaxed text-foreground whitespace-pre-line ${!isExpanded && shouldTruncate ? "line-clamp-4" : ""}`}
                  >
                    {review.text}
                  </p>
                  {shouldTruncate && (
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
          Show all 71 reviews
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
              <span className="text-lg font-semibold text-foreground">4.59 · 71 reviews</span>
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
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
