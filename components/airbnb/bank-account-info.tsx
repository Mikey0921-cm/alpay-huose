"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/components/i18n/language-context"

const BANK_ACCOUNT = {
  iban: "TR550020600246048802640001",
  accountHolderName: "Alpay Kaan Tekin",
  bankName: "Türkiye Finans",
}

export type BankAccountInfoProps = {
  /** 总价文案，用于「复制全部」和提示 */
  amountText?: string
  /** 参考号/预订 ID，用于对账 */
  reference?: string
}

export function BankAccountInfo({ amountText, reference }: BankAccountInfoProps) {
  const { t } = useLanguage()
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const copyAll = async () => {
    const lines: string[] = []
    if (amountText) lines.push(`${t("payment.totalAmount")}: ${amountText}`)
    lines.push(`${t("payment.iban")}: ${BANK_ACCOUNT.iban}`)
    lines.push(`${t("payment.accountHolder")}: ${BANK_ACCOUNT.accountHolderName}`)
    lines.push(`${t("payment.bankName")}: ${BANK_ACCOUNT.bankName}`)
    if (reference) lines.push(`Reference: ${reference}`)
    await copyToClipboard(lines.join("\n"), "all")
  }

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{t("payment.bankAccountInfo")}</h3>
      {amountText && (
        <p className="mb-3 text-sm font-medium text-foreground">
          {t("payment.transferExactAmount")}
        </p>
      )}
      <p className="mb-4 text-sm text-muted-foreground">
        {t("payment.copyToBank")}
      </p>

      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={copyAll}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          {copiedField === "all" ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-green-600">{t("payment.copied")}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>{t("payment.copyAllTransferInfo")}</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-4">
        {/* IBAN */}
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">{t("payment.iban")}</label>
            <button
              onClick={() => copyToClipboard(BANK_ACCOUNT.iban, "iban")}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              aria-label={t("payment.copy") + " " + t("payment.iban")}
            >
              {copiedField === "iban" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-green-600">{t("payment.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t("payment.copy")}</span>
                </>
              )}
            </button>
          </div>
          <p className="text-lg font-mono font-semibold text-foreground">
            {BANK_ACCOUNT.iban}
          </p>
        </div>

        {/* 账户持有人姓名 */}
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">{t("payment.accountHolder")}</label>
            <button
              onClick={() => copyToClipboard(BANK_ACCOUNT.accountHolderName, "accountHolderName")}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
              aria-label={t("payment.copy") + " " + t("payment.accountHolder")}
            >
              {copiedField === "accountHolderName" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-green-600">{t("payment.copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>{t("payment.copy")}</span>
                </>
              )}
            </button>
          </div>
          <p className="text-lg font-semibold text-foreground">
            {BANK_ACCOUNT.accountHolderName}
          </p>
        </div>

        {/* 银行名称 */}
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">{t("payment.bankName")}</label>
          <p className="text-lg font-semibold text-foreground">{BANK_ACCOUNT.bankName}</p>
        </div>

        {/* 参考号 / 转账备注 */}
        {reference && (
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">{t("payment.reference")}</label>
              <button
                onClick={() => copyToClipboard(reference, "reference")}
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                aria-label={t("payment.copy") + " " + t("payment.reference")}
              >
                {copiedField === "reference" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-600" />
                    <span className="text-green-600">{t("payment.copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t("payment.copy")}</span>
                  </>
                )}
              </button>
            </div>
            <p className="break-all font-mono text-sm font-semibold text-foreground">{reference}</p>
          </div>
        )}
      </div>

      <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
        <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-200">
          <strong>{t("payment.importantNote")}：</strong>{t("payment.noteText")}
        </p>
      </div>
    </div>
  )
}
