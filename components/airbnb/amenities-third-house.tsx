"use client"

import { useState } from "react"
import {
  ShowerHead,
  WashingMachine,
  ThermometerSun,
  Flame,
  ShieldAlert,
  UtensilsCrossed,
  Refrigerator,
  DoorOpen,
  MapPin,
  Trees,
  Car,
  PawPrint,
  Luggage,
  CalendarClock,
  X,
} from "lucide-react"

const primaryAmenities = [
  { icon: ShowerHead, label: "Bathroom" },
  { icon: WashingMachine, label: "Free washer – In building" },
  { icon: ThermometerSun, label: "Air conditioning" },
  { icon: Flame, label: "Indoor fireplace: wood-burning" },
  { icon: UtensilsCrossed, label: "Kitchen" },
  { icon: Refrigerator, label: "Mini fridge" },
  { icon: DoorOpen, label: "Private entrance" },
  { icon: Car, label: "Free parking on premises" },
  { icon: PawPrint, label: "Pets allowed" },
]

const allAmenities = [
  {
    category: "Bathroom",
    items: ["Hair dryer", "Cleaning products", "Hot water"],
  },
  {
    category: "Bedroom and laundry",
    items: [
      "Free washer – In building",
      "Hangers",
      "Bed linens",
      "Cotton Other linens",
      "Iron",
      "Mosquito net",
      "Clothing storage: closet",
    ],
  },
  {
    category: "Heating and cooling",
    items: ["Air conditioning", "Indoor fireplace: wood-burning", "Heating"],
  },
  {
    category: "Home safety",
    items: ["Carbon monoxide alarm", "Fire extinguisher"],
  },
  {
    category: "Kitchen and dining",
    items: [
      "Kitchen",
      "Space where guests can cook their own meals",
      "Refrigerator",
      "Dishes and silverware",
      "Bowls, chopsticks, plates, cups, etc.",
      "Mini fridge",
      "Hot water kettle",
      "Dining table",
    ],
  },
  {
    category: "Location features",
    items: [
      "Private entrance",
      "Separate street or building entrance",
      "Laundromat nearby",
    ],
  },
  {
    category: "Outdoor",
    items: [
      "Fire pit",
      "Outdoor furniture",
      "Outdoor dining area",
      "BBQ grill",
    ],
  },
  {
    category: "Parking and facilities",
    items: ["Free parking on premises", "Single level home", "No stairs in home"],
  },
  {
    category: "Services",
    items: [
      "Pets allowed",
      "Assistance animals are always allowed",
      "Luggage dropoff allowed",
      "For guests' convenience when they have early arrival or late departure",
      "Long term stays allowed",
      "Allow stay for 28 days or more",
    ],
  },
]

const notIncluded = [
  "Exterior security cameras on property",
  "Wifi",
  "TV",
  "Dryer",
  "Essentials",
  "Smoke alarm (There is no smoke alarm on the property.)",
]

export function AmenitiesThirdHouse() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="border-b border-border py-12">
      <h2 className="mb-8 text-xl font-semibold text-foreground">
        What this place offers
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {primaryAmenities.map((amenity) => (
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
        Show all amenities
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

            <div className="mt-4 border-t border-border pt-4">
              <h3 className="mb-3 text-lg font-medium text-foreground">
                Not included
              </h3>
              {notIncluded.map((item) => (
                <div
                  key={item}
                  className="border-b border-border py-3 text-sm text-muted-foreground last:border-b-0"
                >
                  <span className="mr-1 font-semibold text-foreground">Unavailable:</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

