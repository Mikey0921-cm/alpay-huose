"use client"

import { useState } from "react"
import { ChevronRight, X } from "lucide-react"

export function ListingDescriptionThirdHouse() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="border-b border-border py-12">
        {/* About this space heading */}
        <h3 className="mb-4 text-lg font-semibold text-foreground">About this space</h3>

        <div className="relative">
          <div className="max-h-[220px] overflow-hidden text-[15px] leading-relaxed text-foreground">
            <p className="mb-3">
              Siri House offers an ideal place for those looking for a peaceful holiday in the heart of Foça&apos;s
              nature. Surrounded by olive trees, this house has a small kitchen to meet your needs. While resting with
              the sounds of birds, you can reach the sea with just a 10-minute drive. In our garden, you will step into
              a world full of our cats and dogs. It would be more appropriate for our guests who do not like contact
              with animals to consider another accommodation option.
            </p>
            <p className="mb-3 font-semibold uppercase">THERE IS NO JACUZZI!</p>
            <p className="mb-2 font-semibold">The space</p>
            <ul className="mb-3 list-none space-y-1.5">
              <li>🏡 100 square meters of private garden</li>
              <li>🍖 Barbecue</li>
              <li>🍽️ Kitchen</li>
              <li>🛌 King size comfortable bed</li>
              <li>📸 Natural beauties to take dozens of photos</li>
              <li>🛋️ Living area</li>
              <li>🔒 Secure lockable entrance</li>
              <li>🔇 Away from the city noise</li>
              <li>🚘 Pick up by car from Bağarası center</li>
              <li>💫 Starry nights</li>
              <li>👩‍💻 Private workspace</li>
              <li>👫 Peaceful walking route</li>
            </ul>
            <p className="mb-3">
              And the creatures we host in our olive grove :){" "}
              <span role="img" aria-label="animals">
                🐶🦉🐌🐱🦋🕊️
              </span>
            </p>
            <p className="mb-2 font-semibold">Guest access</p>
            <p className="mb-3">
              Our guests can access all areas in the garden allocated to them.
            </p>
            <p className="mb-3 font-semibold">‼️ If you think our service does not meet your expectations, please contact us within 15 minutes of check-in.</p>
            <p className="mb-3 font-semibold">❗️Financial and Moral explanation:</p>
            <p className="mb-3">
              I&apos;m using a loophole in Airbnb to get my guests to stay more than one night. I use the concept of
              business money out of context to get my potential guests to stay more than one night.
            </p>
            <p className="mb-2 font-semibold">Other things to note</p>
            <p className="mb-3">🏞️ Information on historical and natural sightseeing areas</p>
            <p className="mb-2 font-semibold">Registration Details</p>
            <p className="mb-1">19-2568</p>
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
              <h2 className="mb-5 text-2xl font-semibold text-foreground">About this space</h2>
              <div className="text-[15px] leading-relaxed text-foreground">
                <p className="mb-4">
                  Siri House offers an ideal place for those looking for a peaceful holiday in the heart of Foça&apos;s
                  nature. Surrounded by olive trees, this house has a small kitchen to meet your needs. While resting
                  with the sounds of birds, you can reach the sea with just a 10-minute drive. In our garden, you will
                  step into a world full of our cats and dogs. It would be more appropriate for our guests who do not
                  like contact with animals to consider another accommodation option.
                </p>
                <p className="mb-4 font-semibold uppercase">THERE IS NO JACUZZI!</p>

                <h3 className="mb-3 text-lg font-semibold text-foreground">The space</h3>
                <ul className="mb-4 list-none space-y-1.5">
                  <li>🏡 100 square meters of private garden</li>
                  <li>🍖 Barbecue</li>
                  <li>🍽️ Kitchen</li>
                  <li>🛌 King size comfortable bed</li>
                  <li>📸 Natural beauties to take dozens of photos</li>
                  <li>🛋️ Living area</li>
                  <li>🔒 Secure lockable entrance</li>
                  <li>🔇 Away from the city noise</li>
                  <li>🚘 Pick up by car from Bağarası center</li>
                  <li>💫 Starry nights</li>
                  <li>👩‍💻 Private workspace</li>
                  <li>👫 Peaceful walking route</li>
                </ul>

                <p className="mb-4">
                  And the creatures we host in our olive grove :){" "}
                  <span role="img" aria-label="animals">
                    🐶🦉🐌🐱🦋🕊️
                  </span>
                </p>

                <h3 className="mb-3 text-lg font-semibold text-foreground">Guest access</h3>
                <p className="mb-4">
                  Our guests can access all areas in the garden allocated to them.
                </p>

                <p className="mb-4 font-semibold">
                  ‼️ If you think our service does not meet your expectations, please contact us within 15 minutes of
                  check-in.
                </p>

                <h3 className="mb-3 text-lg font-semibold text-foreground">Financial and Moral explanation</h3>
                <p className="mb-4">
                  I&apos;m using a loophole in Airbnb to get my guests to stay more than one night. I use the concept of
                  business money out of context to get my potential guests to stay more than one night.
                </p>

                <h3 className="mb-3 text-lg font-semibold text-foreground">Other things to note</h3>
                <p className="mb-4">🏞️ Information on historical and natural sightseeing areas</p>

                <h3 className="mb-2 text-lg font-semibold text-foreground">Registration Details</h3>
                <p>19-2568</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

