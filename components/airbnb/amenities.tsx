"use client"

import { useState } from "react"
import {
  Wifi,
  Tv,
  Car,
  Snowflake,
  Flame,
  UtensilsCrossed,
  WashingMachine,
  Wind,
  ShieldCheck,
  Coffee,
  X,
} from "lucide-react"

const amenities = [
  { icon: Wifi, label: "Wifi" },
  { icon: Tv, label: "TV" },
  { icon: UtensilsCrossed, label: "Kitchen" },
  { icon: WashingMachine, label: "Washer" },
  { icon: Car, label: "Free parking on premises" },
  { icon: Snowflake, label: "Air conditioning" },
  { icon: Flame, label: "Heating" },
  { icon: Wind, label: "Hair dryer" },
  { icon: ShieldCheck, label: "Smoke alarm" },
  { icon: Coffee, label: "Coffee maker" },
]

const allAmenities = [
  {
    category: "Bathroom",
    items: ["Hair dryer", "Shampoo", "Hot water", "Shower gel"],
  },
  {
    category: "Bedroom and laundry",
    items: [
      "Washer",
      "Dryer",
      "Essentials (towels, bed sheets, soap, toilet paper)",
      "Hangers",
      "Iron",
    ],
  },
  {
    category: "Entertainment",
    items: ["TV", "Books and reading material"],
  },
  {
    category: "Heating and cooling",
    items: ["Air conditioning", "Central heating"],
  },
  {
    category: "Kitchen and dining",
    items: [
      "Kitchen",
      "Refrigerator",
      "Microwave",
      "Cooking basics",
      "Dishes and silverware",
      "Dishwasher",
      "Coffee maker",
    ],
  },
  {
    category: "Internet and office",
    items: ["Wifi", "Dedicated workspace"],
  },
  {
    category: "Parking and facilities",
    items: ["Free parking on premises", "Elevator"],
  },
  {
    category: "Safety",
    items: ["Smoke alarm", "Carbon monoxide alarm", "Fire extinguisher", "First aid kit"],
  },
]

export function Amenities() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="border-b border-border py-12">
      <h2 className="mb-8 text-xl font-semibold text-foreground">
        What this place offers
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {amenities.map((amenity) => (
          <div key={amenity.label} className="flex items-center gap-4">
            <amenity.icon className="h-6 w-6 text-foreground" />
            <span className="text-foreground">{amenity.label}</span>
          </div>
        ))}
      </div>
      <button
        className="mt-6 rounded-lg border border-foreground px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
        onClick={() => setShowAll(true)}
      >
        Show all {allAmenities.reduce((sum, cat) => sum + cat.items.length, 0)}{" "}
        amenities
      </button>

      {/* Modal */}
      {showAll && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50">
          <div className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-background p-8 shadow-lg">
            <button
              className="absolute left-4 top-4 rounded-full p-1 hover:bg-secondary"
              onClick={() => setShowAll(false)}
              aria-label="Close amenities"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
              What this place offers
            </h2>
            {allAmenities.map((category) => (
              <div key={category.category} className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-foreground">
                  {category.category}
                </h3>
                {category.items.map((item) => (
                  <div
                    key={item}
                    className="border-b border-border py-4 text-foreground last:border-b-0"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
