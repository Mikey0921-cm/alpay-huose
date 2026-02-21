"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import type { Language } from "@/lib/translations"
import { languages, getTranslation } from "@/lib/translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  availableLanguages: typeof languages
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // 从 localStorage 加载语言设置
  useEffect(() => {
    const stored = localStorage.getItem("language")
    if (stored && languages.some((l) => l.code === stored)) {
      setLanguageState(stored as Language)
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language.split("-")[0]
      const detectedLang = languages.find((l) => l.code === browserLang)?.code || "en"
      setLanguageState(detectedLang as Language)
    }
  }, [])

  // 同步语言到 <html lang>，便于 SEO 与无障碍
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language)
    }
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string) => getTranslation(language, key)

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages: languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
