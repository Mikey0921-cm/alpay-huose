import Image from "next/image"
import { Waves, Wifi } from "lucide-react"

export function HostInfoThirdHouse() {
  return (
    <div className="flex flex-col gap-0 border-b border-border pb-12">
      {/* Host Section */}
      <div className="flex items-center gap-5 py-9">
        <div className="relative h-12 w-12 flex-shrink-0">
          <Image
            src="https://a0.muscache.com/im/pictures/user/User/original/3dc6780b-29b7-4c25-8114-f3de5ff369fc.jpeg?im_w=240"
            alt="Host"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Hosted by Marina
          </h2>
          <p className="text-sm text-muted-foreground">3 years hosting</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-col gap-9 border-t border-border pt-9">
        <div className="flex items-start gap-6">
          <Waves className="mt-0.5 h-7 w-7 flex-shrink-0 text-foreground" />
          <div>
            <p className="font-medium text-foreground">Sea view</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Enjoy stunning views of the Aegean Sea from your balcony.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <Wifi className="mt-0.5 h-7 w-7 flex-shrink-0 text-foreground" />
          <div>
            <p className="font-medium text-foreground">
              High-speed WiFi
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              Stay connected with fast internet throughout your stay.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
