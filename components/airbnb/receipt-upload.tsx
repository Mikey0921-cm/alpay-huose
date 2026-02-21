"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, X, FileImage, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/components/i18n/language-context"
import { formatDateTime as formatDateTimeLocale } from "@/lib/date-format"

export type ReceiptStatus = "pending" | "uploaded" | "verified" | "rejected"

export type ReceiptData = {
  id: string
  bookingId: string
  file: File | null
  previewUrl: string | null
  uploadedAt: Date | null
  status: ReceiptStatus
  message?: string
}

interface ReceiptUploadProps {
  bookingId: string
  onUploadComplete?: (receipt: ReceiptData) => void
  existingReceipt?: ReceiptData | null
  /** 是否已保存联系信息，未保存时先提示再允许上传 */
  hasContactInfo?: boolean
}

export function ReceiptUpload({ bookingId, onUploadComplete, existingReceipt, hasContactInfo = true }: ReceiptUploadProps) {
  const { t, language } = useLanguage()
  const [receipt, setReceipt] = useState<ReceiptData | null>(existingReceipt || null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 当 existingReceipt 变化时更新状态
  useEffect(() => {
    if (existingReceipt) {
      setReceipt(existingReceipt)
    }
  }, [existingReceipt])

  const handleFileSelect = async (file: File) => {
    setError(null)
    if (!hasContactInfo) {
      setError(t("payment.saveContactFirst"))
      return
    }
    if (!/^image\/(jpe?g|png)$/i.test(file.type)) {
      setError(t("payment.uploadError"))
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError(t("payment.uploadError"))
      return
    }

    const previewUrl = URL.createObjectURL(file)
    
    // 将文件转换为 base64 以便持久化保存
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      const newReceipt: ReceiptData = {
        id: existingReceipt?.id || `receipt-${Date.now()}`,
        bookingId,
        file,
        previewUrl: base64String, // 使用 base64 字符串而不是 blob URL
        uploadedAt: new Date(),
        status: "uploaded",
      }

      setReceipt(newReceipt)
      
      // 保存到 localStorage
      const receipts = JSON.parse(localStorage.getItem("receipts") || "[]")
      const existingIndex = receipts.findIndex((r: ReceiptData) => r.id === newReceipt.id)
      
      if (existingIndex >= 0) {
        receipts[existingIndex] = {
          ...newReceipt,
          file: null, // 不保存 File 对象到 localStorage
        }
      } else {
        receipts.push({
          ...newReceipt,
          file: null,
        })
      }
      
      localStorage.setItem("receipts", JSON.stringify(receipts))
      
      if (onUploadComplete) {
        onUploadComplete(newReceipt)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileInput = (e: React.React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const removeReceipt = () => {
    // 从 localStorage 移除
    const receipts = JSON.parse(localStorage.getItem("receipts") || "[]")
    const filtered = receipts.filter((r: ReceiptData) => r.id !== receipt?.id)
    localStorage.setItem("receipts", JSON.stringify(filtered))
    
    setReceipt(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getStatusBadge = (status: ReceiptStatus) => {
    switch (status) {
      case "uploaded":
        return (
          <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            <CheckCircle2 className="h-3 w-3" />
            {t("payment.uploadedWaiting")}
          </div>
        )
      case "verified":
        return (
          <div className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3" />
            {t("payment.verified")}
          </div>
        )
      case "rejected":
        return (
          <div className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-300">
            <AlertCircle className="h-3 w-3" />
            {t("payment.rejected")}
          </div>
        )
      default:
        return null
    }
  }

  if (receipt && receipt.previewUrl) {
    return (
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{t("payment.receipt")}</h3>
          {receipt.status !== "verified" && (
            <button
              onClick={removeReceipt}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {receipt.status !== "pending" && (
          <div className="mb-4">{getStatusBadge(receipt.status)}</div>
        )}

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-secondary">
          <Image
            src={receipt.previewUrl}
            alt={t("payment.receipt")}
            fill
            className="object-contain"
          />
        </div>

        {receipt.uploadedAt && (
          <p className="mt-3 text-xs text-muted-foreground">
            {t("payment.uploadTime")}：{formatDateTimeLocale(receipt.uploadedAt instanceof Date ? receipt.uploadedAt : new Date(receipt.uploadedAt), language)}
          </p>
        )}

        {receipt.message && (
          <div className="mt-3 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">{receipt.message}</p>
          </div>
        )}

        {receipt.status === "uploaded" && (
          <p className="mt-3 text-xs text-muted-foreground">
            {t("payment.receiptReceived")}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{t("payment.uploadReceipt")}</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {t("payment.uploadAfterTransfer")}
      </p>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div
        className={`relative rounded-lg border-2 border-dashed p-8 transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-secondary/30 hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label={t("payment.uploadReceipt")}
        />

        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {t("payment.clickOrDrag")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("payment.supportedFormats")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
        <FileImage className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="text-xs leading-relaxed text-blue-900 dark:text-blue-200">
          <p className="font-medium mb-1">{t("payment.receiptRequirements")}：</p>
          <ul className="list-inside list-disc space-y-0.5">
            <li>{t("payment.receiptReq1")}</li>
            <li>{t("payment.receiptReq2")}</li>
            <li>{t("payment.receiptReq3")}</li>
            <li>{t("payment.receiptReq4")}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
