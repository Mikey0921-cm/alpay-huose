"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6">
      <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
      <p className="text-center text-sm text-muted-foreground">
        An error occurred. You can try again or return to the home page.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
