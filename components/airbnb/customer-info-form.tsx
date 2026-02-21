"use client"

import { useState, useEffect } from "react"
import type { CustomerInfo } from "@/components/airbnb/booking-status-context"
import { useLanguage } from "@/components/i18n/language-context"

const LAST_CUSTOMER_KEY = "lastCustomerInfo"

function getLastCustomerInfo(): CustomerInfo | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(LAST_CUSTOMER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CustomerInfo
    if (parsed && typeof parsed.name === "string" && typeof parsed.email === "string" && typeof parsed.phone === "string") {
      return { name: parsed.name, email: parsed.email, phone: parsed.phone }
    }
  } catch {
    // ignore
  }
  return null
}

interface CustomerInfoFormProps {
  bookingId: string
  existingInfo?: CustomerInfo | null
  onSave: (info: CustomerInfo) => void
}

export function CustomerInfoForm({ bookingId, existingInfo, onSave }: CustomerInfoFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<CustomerInfo>(() => ({
    name: existingInfo?.name || "",
    email: existingInfo?.email || "",
    phone: existingInfo?.phone || "",
  }))
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (existingInfo?.name?.trim()) {
      setFormData({ name: existingInfo.name, email: existingInfo.email, phone: existingInfo.phone })
    } else {
      const last = getLastCustomerInfo()
      if (last) {
        setFormData(last)
      }
    }
  }, [existingInfo])

  const validateField = (field: keyof CustomerInfo): string | null => {
    switch (field) {
      case "name":
        return !formData.name.trim() ? t("payment.enterFullName") : null
      case "email":
        if (!formData.email.trim()) return t("payment.enterEmail")
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return t("payment.validEmail")
        return null
      case "phone":
        if (!formData.phone.trim()) return t("payment.enterPhone")
        if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) return t("payment.validPhone")
        return null
      default:
        return null
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {}
    ;(["name", "email", "phone"] as const).forEach((key) => {
      const msg = validateField(key)
      if (msg) newErrors[key] = msg
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBlur = (field: keyof CustomerInfo) => {
    const msg = validateField(field)
    setErrors((prev) => (msg ? { ...prev, [field]: msg } : { ...prev, [field]: undefined }))
  }

  const clearError = (field: keyof CustomerInfo) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSave(formData)
      try {
        localStorage.setItem(LAST_CUSTOMER_KEY, JSON.stringify(formData))
      } catch {
        // ignore
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{t("payment.customerInfo")}</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("payment.fillContactInfo")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("payment.name")} <span className="text-red-500">{t("payment.required")}</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              clearError("name")
            }}
            onBlur={() => handleBlur("name")}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? "border-red-500" : "border-border"
            }`}
            placeholder={t("payment.enterFullName")}
            aria-label={t("payment.name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("payment.email")} <span className="text-red-500">{t("payment.required")}</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
              clearError("email")
            }}
            onBlur={() => handleBlur("email")}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? "border-red-500" : "border-border"
            }`}
            placeholder={t("payment.placeholderEmail")}
            aria-label={t("payment.email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
            {t("payment.phone")} <span className="text-red-500">{t("payment.required")}</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value })
              clearError("phone")
            }}
            onBlur={() => handleBlur("phone")}
            className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? "border-red-500" : "border-border"
            }`}
            placeholder={t("payment.placeholderPhone")}
            aria-label={t("payment.phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {saved ? t("payment.saved") : t("payment.saveInfo")}
        </button>
      </form>
    </div>
  )
}
