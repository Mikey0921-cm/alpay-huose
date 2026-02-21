import type { Language } from "./translations"

// 语言到 Intl locale 的映射
const LOCALE_MAP: Record<Language, string> = {
  en: "en-US",
  tr: "tr-TR",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
  zh: "zh-CN",
}

/**
 * 根据当前语言格式化日期（数字格式，如 2/13/2026 或 13.02.2026）
 */
export function formatDateNumeric(date: Date | null, language: Language): string {
  if (!date) return "—"
  const locale = LOCALE_MAP[language]
  return new Intl.DateTimeFormat(locale, {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * 带月份名称的格式（如 Jan 15, 2026 或 2026年1月15日）
 */
export function formatDateWithMonth(date: Date | null, language: Language): string {
  if (!date) return "—"
  const locale = LOCALE_MAP[language]
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

/**
 * 日期范围显示（如 Jan 15 – Jan 20）
 */
export function formatDateRange(
  start: Date | null,
  end: Date | null,
  language: Language
): string {
  if (!start || !end) return ""
  const locale = LOCALE_MAP[language]
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
  return `${new Intl.DateTimeFormat(locale, opts).format(start)} – ${new Intl.DateTimeFormat(locale, opts).format(end)}`
}

/**
 * 获取某语言的月份短名数组（用于日历等）
 */
export function getMonthShortNames(language: Language): string[] {
  const locale = LOCALE_MAP[language]
  const formatter = new Intl.DateTimeFormat(locale, { month: "short" })
  return Array.from({ length: 12 }, (_, i) =>
    formatter.format(new Date(2024, i, 1))
  )
}

/**
 * 获取某语言的月份全名数组
 */
export function getMonthNames(language: Language): string[] {
  const locale = LOCALE_MAP[language]
  const formatter = new Intl.DateTimeFormat(locale, { month: "long" })
  return Array.from({ length: 12 }, (_, i) =>
    formatter.format(new Date(2024, i, 1))
  )
}

/**
 * 日期时间格式（用于收据上传时间等）
 */
export function formatDateTime(date: Date | null, language: Language): string {
  if (!date) return "—"
  const locale = LOCALE_MAP[language]
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}
