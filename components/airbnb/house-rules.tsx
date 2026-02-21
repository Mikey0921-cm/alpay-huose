"use client"

import { ChevronRight, X } from "lucide-react"
import { useState } from "react"

const cancellationIcon = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" className="h-6 w-6 shrink-0" fill="currentColor">
    <path d="m12 0v2h8v-2h2v2h6c1.1045695 0 2 .8954305 2 2v21c0 2.7614237-2.2385763 5-5 5h-18c-2.76142375 0-5-2.2385763-5-5v-21c0-1.1045695.8954305-2 2-2h6v-2zm16 12h-24v13c0 1.6568542 1.34314575 3 3 3h18c1.6568542 0 3-1.3431458 3-3zm-8.2071068 2.2928932 1.4142136 1.4142136-3.7921068 3.7928932 3.7921068 3.7928932-1.4142136 1.4142136-3.7928932-3.7921068-3.7928932 3.7921068-1.4142136-1.4142136 3.7921068-3.7928932-3.7921068-3.7928932 1.4142136-1.4142136 3.7928932 3.7921068zm-9.7928932-10.2928932h-6v6h24v-6h-6v2h-2v-2h-8v2h-2z" />
  </svg>
)

const houseRulesIcon = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" className="h-6 w-6 shrink-0" fill="currentColor">
    <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z" />
  </svg>
)

const safetyIcon = (
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" className="h-6 w-6 shrink-0" fill="currentColor">
    <path d="m16 .8.56.37C20.4 3.73 24.2 5 28 5h1v12.5C29 25.57 23.21 31 16 31S3 25.57 3 17.5V5h1c3.8 0 7.6-1.27 11.45-3.83L16 .8zm-1 3a22.2 22.2 0 0 1-9.65 3.15L5 6.97V17.5c0 6.56 4.35 11 10 11.46zm2 0v25.16c5.65-.47 10-4.9 10-11.46V6.97l-.35-.02A22.2 22.2 0 0 1 17 3.8z" />
  </svg>
)

const chevronIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={4}>
    <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
  </svg>
)

type ModalContent = "rules" | "safety" | "cancellation" | null

const rulesDetails: Record<NonNullable<ModalContent>, { title: string; items: string[] }> = {
  cancellation: {
    title: "Cancellation policy",
    items: [
      "Free cancellation for 24 hours after booking.",
      "Cancel before February 12 for a partial refund.",
      "After that date, the reservation may be non-refundable.",
      "Review this host's full policy for details.",
    ],
  },
  rules: {
    title: "House rules",
    items: [
      "Check-in: 5:00 PM - 8:00 PM",
      "Checkout before 11:00 AM",
      "2 guests maximum",
      "No smoking",
      "No parties or events",
    ],
  },
  safety: {
    title: "Safety & property",
    items: [
      "Pool/hot tub without a gate or lock",
      "Heights without rails or protection",
      "Carbon monoxide alarm",
    ],
  },
}

const thingsToKnowItems: {
  id: ModalContent
  icon: React.ReactNode
  title: string
  summary: React.ReactNode
}[] = [
  {
    id: "cancellation",
    icon: cancellationIcon,
    title: "Cancellation policy",
    summary: (
      <>
        <div>Free cancellation for 24 hours. Cancel before February 12 for a partial refund.</div>
        <div>Review this host&apos;s full policy for details.</div>
      </>
    ),
  },
  {
    id: "rules",
    icon: houseRulesIcon,
    title: "House rules",
    summary: (
      <>
        <div>Check-in: 5:00 PM - 8:00 PM</div>
        <div>Checkout before 11:00 AM</div>
        <div>2 guests maximum</div>
      </>
    ),
  },
  {
    id: "safety",
    icon: safetyIcon,
    title: "Safety & property",
    summary: (
      <>
        <div>Pool/hot tub without a gate or lock</div>
        <div>Heights without rails or protection</div>
        <div>Carbon monoxide alarm</div>
      </>
    ),
  },
]

export function HouseRules() {
  const [modal, setModal] = useState<ModalContent>(null)

  return (
    <>
      <div className="border-b border-border py-12">
        <h2 className="mb-6 text-xl font-semibold text-foreground">Things to know</h2>

        <div className="flex flex-col gap-0">
          {thingsToKnowItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setModal(item.id)}
              aria-label={`Learn more about ${item.title}`}
              className="flex w-full items-center gap-5 border-b border-border py-5 text-left transition-colors hover:bg-secondary/30 last:border-b-0"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center text-foreground">
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground">{item.title}</div>
                <div className="mt-0.5 text-sm text-muted-foreground [&>div]:leading-relaxed">
                  {item.summary}
                </div>
              </div>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">
                {chevronIcon}
              </div>
            </button>
          ))}
        </div>
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50"
          onClick={() => setModal(null)}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-md overflow-y-auto rounded-xl bg-background p-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute left-4 top-4 rounded-full p-1 transition-colors hover:bg-secondary"
              onClick={() => setModal(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <h2 className="mb-6 pt-2 text-center text-lg font-semibold text-foreground">
              {rulesDetails[modal].title}
            </h2>
            <div className="flex flex-col gap-0">
              {rulesDetails[modal].items.map((item) => (
                <div
                  key={item}
                  className="border-b border-border py-4 text-sm text-foreground last:border-b-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
