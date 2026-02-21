import Image from "next/image"
import { Sprout, Heart } from "lucide-react"

export function HostInfoSecondHouse() {
  return (
    <div className="flex flex-col gap-0 border-b border-border pb-12">
      {/* Host Section */}
      <div className="flex items-center gap-5 py-9">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src="https://a0.muscache.com/im/pictures/user/6bd9646c-2a5d-4a34-b176-e83c14332496.jpg?im_w=240"
            alt="Host Alpay"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Hosted by Alpay
          </h2>
          <p className="text-sm text-muted-foreground">5 years hosting</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-9 border-t border-border pt-9">
        <div className="flex items-start gap-6">
          <Sprout className="mt-0.5 h-7 w-7 flex-shrink-0 text-foreground" />
          <div>
            <p className="font-medium text-foreground">Garden view</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Soak up the view during your stay.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Heart className="mt-0.5 h-7 w-7 flex-shrink-0 text-foreground" />
          <div>
            <p className="font-medium text-foreground">
              Furry friends welcome
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Bring your pets along for the stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
