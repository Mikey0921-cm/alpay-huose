"use client"

import { useState } from "react"
import { ChevronRight, X } from "lucide-react"

export function ListingDescription() {
  const [showModal, setShowModal] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)

  return (
    <>
      <div className="border-b border-border py-12">
        {/* Translation notice */}
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-secondary/70 px-5 py-3.5 text-sm text-foreground">
          <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" fill="currentColor" stroke="none"/>
          </svg>
          <span>
            Some info has been automatically translated.{" "}
            <button
              className="font-semibold underline decoration-foreground/40 underline-offset-2 transition-colors hover:text-muted-foreground"
              onClick={() => setShowOriginal(!showOriginal)}
            >
              {showOriginal ? "Show translated" : "Show original"}
            </button>
          </span>
        </div>

        {/* About this space heading */}
        <h3 className="mb-4 text-lg font-semibold text-foreground">About this space</h3>

        <div className="relative">
          <div className="max-h-[180px] overflow-hidden text-[15px] leading-relaxed text-foreground">
            {showOriginal ? (
              <>
                <p className="mb-3">
                  {"\u0130\u00e7inde 10 d\u00f6n\u00fcml\u00fck zeytin bah\u00e7esi bulunan evimiz, do\u011fan\u0131n t\u00fcm tonlar\u0131yla Eski Fo\u00e7a ve Yeni Fo\u00e7a'ya sadece 10 dakika, Ba\u011faras\u0131 \u00c7ar\u015f\u0131s\u0131'na ise 2 dakika uzakl\u0131ktad\u0131r!"}
                </p>
                <p className="mb-3">
                  {"S\u0131cak yaz g\u00fcnlerinde rengarenk \u00e7i\u00e7ekler, kedilerin m\u0131r\u0131lt\u0131s\u0131, ku\u015flar\u0131n \u00f6t\u00fc\u015f\u00fc her yere yay\u0131lacak, oksijen dolu hava ci\u011ferlerinizi tazeleyecektir."}
                </p>
                <p className="mb-3">
                  {"Sevimli mimarisiyle sizi evinizde hissettirmek i\u00e7in her ayr\u0131nt\u0131 d\u00fc\u015f\u00fcn\u00fclm\u00fc\u015ft\u00fcr."}
                </p>
              </>
            ) : (
              <>
                <p className="mb-3">
                  {"Our house in a 10-acre olive grove with all shades of nature is only 10 minutes from Old Fo\u00e7a and New Fo\u00e7a and 2 minutes from Ba\u011faras\u0131 Bazaar!"}
                </p>
                <p className="mb-3">
                  On hot summer days, the colorful flowers, the purring of cats and the chirping of birds will spread everywhere, and the oxygen-filled air will refresh your lungs.
                </p>
                <p className="mb-3">
                  Every detail has been considered to make you feel at home with its lovely architecture.
                </p>
                <p>
                  We would like to point out that this house may not be suitable for our guests who are not comfortable with contact with animals.
                </p>
              </>
            )}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        </div>

        <button
          className="mt-2 flex items-center gap-1 text-[15px] font-semibold text-foreground underline decoration-foreground underline-offset-2 transition-colors hover:text-muted-foreground"
          onClick={() => setShowModal(true)}
        >
          Show more
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Full Description Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-0 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 flex items-center border-b border-border bg-background px-6 py-4">
              <button
                className="rounded-full p-1.5 transition-colors hover:bg-secondary"
                onClick={() => setShowModal(false)}
                aria-label="Close description"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <div className="px-8 py-6">
              {/* About this space */}
              <h2 className="mb-5 text-2xl font-semibold text-foreground">About this space</h2>
              <div className="text-[15px] leading-relaxed text-foreground">
                <p className="mb-4">
                  {"Our house in a 10-acre olive grove with all shades of nature is only 10 minutes from Old Fo\u00e7a and New Fo\u00e7a and 2 minutes from Ba\u011faras\u0131 Bazaar!"}
                </p>
                <p className="mb-4">
                  On hot summer days, the colorful flowers, the purring of cats and the chirping of birds will spread everywhere, and the oxygen-filled air will refresh your lungs.
                </p>
                <p className="mb-4">
                  Every detail has been considered to make you feel at home with its lovely architecture.
                </p>
                <p className="mb-8">
                  We would like to point out that this house may not be suitable for our guests who are not comfortable with contact with animals.
                </p>
              </div>

              {/* The space */}
              <h3 className="mb-4 text-lg font-semibold text-foreground">The space</h3>
              <div className="mb-8 grid grid-cols-1 gap-2.5 text-[15px] text-foreground sm:grid-cols-2">
                {[
                  { icon: "\ud83c\udfe1", text: "100 square meters of private garden" },
                  { icon: "\ud83c\udf56", text: "Barbecue" },
                  { icon: "\ud83d\udecf\ufe0f", text: "King size comfortable bed" },
                  { icon: "\ud83d\udcf8", text: "Natural beauties to take dozens of photos" },
                  { icon: "\ud83d\udec0", text: "Fully equipped bathroom" },
                  { icon: "\ud83d\udecb\ufe0f", text: "Comfortable sitting area" },
                  { icon: "\ud83d\udd12", text: "Secure lockable entrance" },
                  { icon: "\ud83d\udd07", text: "Away from the city noise" },
                  { icon: "\ud83d\ude98", text: "Pick up by car from Ba\u011faras\u0131 center" },
                  { icon: "\ud83d\udcab", text: "Starry nights" },
                  { icon: "\ud83d\udc69\u200d\ud83d\udcbb", text: "Private workspace" },
                  { icon: "\ud83d\udc6b", text: "Peaceful walking route" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 rounded-lg py-1.5">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 flex items-center gap-3 text-[15px] text-foreground">
                <span>And the creatures we host in our olive grove :)</span>
                <span className="text-lg">{"\ud83d\udc36\ud83e\udd89\ud83d\udc0c\ud83d\udc31\ud83e\udd8b\ud83d\udd4a\ufe0f"}</span>
              </div>

              {/* Guest access */}
              <h3 className="mb-4 text-lg font-semibold text-foreground">Guest access</h3>
              <div className="mb-8 text-[15px] leading-relaxed text-foreground">
                <p className="mb-3">
                  Note: You can bring your own wood to light the fireplace stove, or we can provide a basket of wood for a fee.
                </p>
                <p>
                  If you think our service does not meet your expectations, please contact us within 15 minutes of check-in.
                </p>
              </div>

              {/* Other things to note */}
              <h3 className="mb-4 text-lg font-semibold text-foreground">Other things to note</h3>
              <div className="mb-8 flex flex-col gap-2.5 text-[15px] text-foreground">
                <p>{"\ud83d\udc36\ud83d\udc31 Our camp is open to our animal-friendly guests"}</p>
                <p>{"\u2705 Check-in time: 5:00 PM"}</p>
                <p>{"\u274e Check-out time: 11:00 AM"}</p>
                <p>{"\ud83d\udeac Tobacco products are not consumed in our homes"}</p>
                <p>{"\ud83d\udeab Our guests are expected to wash the dishes before they leave."}</p>
              </div>

              {/* Registration */}
              <div className="rounded-xl border border-border bg-secondary/50 px-5 py-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Registration Details</p>
                <p className="mt-1">23-0493</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
