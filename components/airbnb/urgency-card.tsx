import { Clock } from "lucide-react"

export function UrgencyCard() {
  return (
    <div className="rounded-xl border border-border bg-background p-5 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-start gap-4">
        <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-foreground" />
        <div>
          <p className="font-semibold text-foreground">
            Act fast, only 18 hours left to book
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            The host will stop accepting bookings for your dates soon.
          </p>
        </div>
      </div>
    </div>
  )
}
