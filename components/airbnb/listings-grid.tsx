"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { LISTINGS } from "@/components/airbnb/listings-data"
import { useLanguage } from "@/components/i18n/language-context"
import { useCurrency } from "@/components/i18n/currency-context"
import { convertFromUSD, formatCurrency } from "@/lib/currencies"

export function ListingsGrid() {
  const { t } = useLanguage()
  const { currency } = useCurrency()

  return (
    <div className="py-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LISTINGS.map((listing, index) => {
          // 根据选择的货币计算价格
          const displayAmount = convertFromUSD(listing.pricePerNightUsd, currency)
          const displayPrice = formatCurrency(displayAmount, currency)

          return (
            <Link
              key={listing.id}
              href={`/listings/${listing.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={`https://a0.muscache.com/${listing.thumbnail}`}
                  alt={listing.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="line-clamp-1 text-sm font-semibold text-foreground">
                    {listing.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-foreground">
                    <Star className="h-3 w-3 fill-foreground" />
                    <span className="font-medium">
                      {listing.rating.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {listing.location}
                </p>
                <p className="mt-1 text-sm text-foreground">
                  <span className="font-semibold">
                    {displayPrice}
                  </span>{" "}
                  <span className="text-muted-foreground">{t("booking.night")}</span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

