"use client"

import { Search, Globe, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/components/i18n/language-context"

export function Header() {
  const { language, setLanguage, t, availableLanguages } = useLanguage()
  const [searchFocused, setSearchFocused] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")
  const langRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchExpanded(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between px-6 py-4 md:px-10 lg:px-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="h-8 w-8 text-primary" fill="currentColor" aria-label="Alpay House homepage" role="img">
            <path d="M16 2C10 2 5 7 5 13c0 4 2.5 7.5 6 9.5V28a1 1 0 001 1h8a1 1 0 001-1v-5.5c3.5-2 6-5.5 6-9.5 0-6-5-11-11-11zm-2 25v-4h4v4h-4zm6.5-7.2l-.5.3V24h-8v-3.9l-.5-.3C8.5 18 7 15.6 7 13c0-5 4-9 9-9s9 4 9 9c0 2.6-1.5 5-4.5 6.8z" />
          </svg>
          <span className="hidden text-xl font-bold text-primary md:block">
            Alpay House
          </span>
        </a>

        {/* Search Bar */}
        <div className="relative" ref={searchRef}>
          {!searchExpanded ? (
            <div
              className={`flex cursor-pointer items-center rounded-full border border-border shadow-sm transition-shadow hover:shadow-md ${searchFocused ? "shadow-md" : ""}`}
              onClick={() => setSearchExpanded(true)}
              onKeyDown={(e) => e.key === "Enter" && setSearchExpanded(true)}
              role="button"
              tabIndex={0}
            >
              <button className="px-4 py-2 text-sm font-medium text-foreground">
                {t("header.anywhere")}
              </button>
              <span className="h-6 w-px bg-border" />
              <button className="px-4 py-2 text-sm font-medium text-foreground">
                {t("header.anyWeek")}
              </button>
              <span className="h-6 w-px bg-border" />
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                {t("header.addGuests")}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Search className="h-4 w-4" />
                </span>
              </button>
            </div>
          ) : (
            <div className="absolute left-1/2 top-0 z-50 w-[600px] -translate-x-1/2 rounded-3xl border border-border bg-background p-6 shadow-xl">
              <button
                className="absolute right-4 top-4 rounded-full p-1 hover:bg-secondary"
                onClick={() => setSearchExpanded(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-foreground">{t("header.where")}</label>
                  <input
                    type="text"
                    placeholder={t("header.searchDestinations")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-foreground">{t("header.checkIn")}</label>
                    <input
                      type="date"
                      defaultValue="2026-02-19"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold uppercase text-foreground">{t("header.checkOut")}</label>
                    <input
                      type="date"
                      defaultValue="2026-02-20"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-foreground">{t("header.guests")}</label>
                  <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>1 {t("booking.guest")}</option>
                    <option>2 {t("booking.guests")}</option>
                    <option>3 {t("booking.guests")}</option>
                    <option>4 {t("booking.guests")}</option>
                  </select>
                </div>
                <button
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  onClick={() => setSearchExpanded(false)}
                >
                  <Search className="h-4 w-4" />
                  {t("header.search")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-3">
          <button
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary md:block"
            onClick={() => window.open("/#host", "_self")}
          >
            {t("header.alpayYourHome")}
          </button>

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              className="rounded-full p-2 text-foreground hover:bg-secondary"
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Choose language"
            >
              <Globe className="h-5 w-5" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-background py-2 shadow-xl">
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
        </div>
      </div>
    </header>
  )
}
