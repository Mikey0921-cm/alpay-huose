"use client"

import { Flag } from "lucide-react"

export function ReportListing() {
  return (
    <div className="flex items-center gap-1.5">
      <Flag className="h-4 w-4 text-muted-foreground" />
      <button className="text-sm text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2 transition-colors hover:text-foreground">
        Report this listing
      </button>
    </div>
  )
}
