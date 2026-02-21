"use client"

import { Star, Share, Heart, X, Copy, Check, Facebook, Twitter, Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

export function ListingHeaderThirdHouse() {
  const [saved, setSaved] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToReviews = () => {
    document.getElementById("reviews-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <div className="flex flex-col gap-2 pb-10 pt-8">
        <h1 className="text-2xl font-semibold text-foreground text-balance">
          Crissy - Siri House Keyif House
        </h1>
        <div className="flex flex-wrap items-center gap-1 text-sm text-foreground">
          <span>4 guests</span>
          <span className="text-muted-foreground"> · </span>
          <span>2 bedrooms</span>
          <span className="text-muted-foreground"> · </span>
          <span>2 beds</span>
          <span className="text-muted-foreground"> · </span>
          <span>1 bath</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 text-sm text-foreground">
            <Star className="h-4 w-4 fill-foreground" />
            <span className="font-medium">4.9</span>
            <span className="text-muted-foreground">{"  "}{"  "}</span>
            <button className="font-medium underline hover:text-muted-foreground transition-colors" onClick={scrollToReviews}>
              89 reviews
            </button>
            <span className="text-muted-foreground">{"  "}{"  "}</span>
            <button
              className="font-medium underline hover:text-muted-foreground transition-colors"
              onClick={() => document.getElementById("location-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              {"İzmir, Turkey"}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-foreground underline hover:bg-secondary transition-colors"
              onClick={() => setShareOpen(true)}
            >
              <Share className="h-4 w-4" />
              Share
            </button>
            <button
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium underline transition-colors ${
                saved ? "text-primary" : "text-foreground hover:bg-secondary"
              }`}
              onClick={() => setSaved(!saved)}
            >
              <Heart className={`h-4 w-4 transition-all ${saved ? "fill-primary text-primary scale-110" : ""}`} />
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50" onClick={() => setShareOpen(false)}>
          <div
            className="relative w-full max-w-md rounded-xl bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute left-4 top-4 rounded-full p-1 hover:bg-secondary transition-colors"
              onClick={() => setShareOpen(false)}
              aria-label="Close share dialog"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <h2 className="mb-6 pt-2 text-center text-lg font-semibold text-foreground">
              Share this place
            </h2>
            <div className="mb-6 flex items-center gap-4 rounded-lg border border-border p-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                <img src="https://a0.muscache.com/im/pictures/09e62e06-aabe-4fa1-85b4-684aa255daaf.jpg?im_w=240" alt="Listing" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Crissy - Siri House Keyif House</p>
                <p className="text-xs text-muted-foreground">1 night - Feb 19-20</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
              <button
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={() => window.open(`mailto:?subject=Check out this place&body=${encodeURIComponent(window.location.href)}`, "_self")}
              >
                <Mail className="h-5 w-5" />
                Email
              </button>
              <button
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={() => window.open(`sms:?body=${encodeURIComponent("Check this out: " + window.location.href)}`)}
              >
                <MessageSquare className="h-5 w-5" />
                Messages
              </button>
              <button
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this place`, "_blank")}
              >
                <Twitter className="h-5 w-5" />
                Twitter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
