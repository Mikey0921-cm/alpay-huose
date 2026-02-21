"use client"

import Link from "next/link"
import { Globe, ChevronUp, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/components/i18n/language-context"
import { useCurrency } from "@/components/i18n/currency-context"

// 使用翻译 key，便于多语言
const footerSectionsConfig = [
  {
    titleKey: "footer.support",
    linkKeys: [
      "footer.myBookings",
      "footer.helpCenter",
      "footer.airCover",
      "footer.antiDiscrimination",
      "footer.disabilitySupport",
      "footer.cancellationOptions",
      "footer.reportConcern",
    ],
  },
  {
    titleKey: "footer.hosting",
    linkKeys: [
      "header.alpayYourHome",
      "footer.airCoverHosts",
      "footer.hostingResources",
      "footer.communityForum",
      "footer.hostingResponsibly",
      "footer.alpayApartments",
    ],
  },
  {
    titleKey: "footer.alpayHouse",
    linkKeys: [
      "footer.newsroom",
      "footer.newFeatures",
      "footer.careers",
      "footer.investors",
      "footer.giftCards",
      "footer.emergencyStays",
    ],
  },
]

export function Footer() {
  const { t, language, setLanguage, availableLanguages } = useLanguage()
  const { currency, setCurrency, availableCurrencies, getCurrencyDisplay } = useCurrency()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const currencyRef = useRef<HTMLDivElement>(null)
  
  // 获取当前语言的显示名称
  const currentLanguage = availableLanguages.find((lang) => lang.code === language) || availableLanguages[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) setCurrencyOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:px-10 lg:px-12">
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {footerSectionsConfig.map((section) => (
            <div key={section.titleKey}>
              <h3 className="mb-4 font-semibold text-foreground">{t(section.titleKey)}</h3>
              <ul className="flex flex-col gap-3">
                {section.linkKeys.map((linkKey) => (
                  <li key={linkKey}>
                    {linkKey === "footer.myBookings" ? (
                      <Link href="/bookings" className="text-sm text-foreground transition-colors hover:underline hover:text-muted-foreground">
                        {t(linkKey)}
                      </Link>
                    ) : (
                      <a href="#" className="text-sm text-foreground transition-colors hover:underline hover:text-muted-foreground">
                        {t(linkKey)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden flex flex-col">
          {footerSectionsConfig.map((section) => (
            <div key={section.titleKey} className="border-b border-border">
              <button
                className="flex w-full items-center justify-between py-4 text-left"
                onClick={() => setExpandedSection(expandedSection === section.titleKey ? null : section.titleKey)}
              >
                <h3 className="font-semibold text-foreground">{t(section.titleKey)}</h3>
                {expandedSection === section.titleKey ? (
                  <ChevronUp className="h-4 w-4 text-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-foreground" />
                )}
              </button>
              {expandedSection === section.titleKey && (
                <ul className="flex flex-col gap-3 pb-4">
                  {section.linkKeys.map((linkKey) => (
                    <li key={linkKey}>
                      {linkKey === "footer.myBookings" ? (
                        <Link href="/bookings" className="text-sm text-foreground transition-colors hover:underline">
                          {t(linkKey)}
                        </Link>
                      ) : (
                        <a href="#" className="text-sm text-foreground transition-colors hover:underline">
                          {t(linkKey)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <div className="flex flex-wrap items-center gap-2 text-sm text-foreground">
            <span>{t("footer.copyright")}</span>
            <span> · </span>
            <a href="#" className="transition-colors hover:underline hover:text-muted-foreground">{t("footer.terms")}</a>
            <span> · </span>
            <a href="#" className="transition-colors hover:underline hover:text-muted-foreground">{t("footer.sitemap")}</a>
            <span> · </span>
            <a href="#" className="transition-colors hover:underline hover:text-muted-foreground">{t("footer.privacy")}</a>
            <span> · </span>
            <a href="#" className="transition-colors hover:underline hover:text-muted-foreground">{t("footer.privacyChoices")}</a>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground">
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                className="flex items-center gap-1 rounded-lg border border-transparent px-2 py-1 transition-colors hover:border-border hover:bg-secondary"
                onClick={() => {
                  setLangOpen(!langOpen)
                  setCurrencyOpen(false)
                }}
              >
                <Globe className="h-4 w-4" /> {currentLanguage.nativeName}
              </button>
              {langOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl border border-border bg-background py-2 shadow-xl">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary ${
                        language === lang.code ? "bg-secondary font-medium" : ""
                      }`}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLangOpen(false)
                      }}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative" ref={currencyRef}>
              <button
                className="rounded-lg border border-transparent px-2 py-1 transition-colors hover:border-border hover:bg-secondary"
                onClick={() => {
                  setCurrencyOpen(!currencyOpen)
                  setLangOpen(false)
                }}
              >
                {getCurrencyDisplay()}
              </button>
              {currencyOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-40 rounded-xl border border-border bg-background py-2 shadow-xl">
                  {availableCurrencies.map((curr) => (
                    <button
                      key={curr.code}
                      className={`w-full px-4 py-2 text-left text-sm text-foreground hover:bg-secondary ${
                        currency === curr.code ? "bg-secondary font-medium" : ""
                      }`}
                      onClick={() => {
                        setCurrency(curr.code)
                        setCurrencyOpen(false)
                      }}
                    >
                      {curr.nativeName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
