 "use client"

import Image from "next/image"
import { Shield, Star, MessageCircle, X, Copy, ExternalLink } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/components/i18n/language-context"

const HOST_WHATSAPP_NUMBER = "+905327853280"
const HOST_WHATSAPP_LINK = "https://wa.me/905327853280"

export function HostProfile() {
  const { t } = useLanguage()
  const [contactOpen, setContactOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const messageButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!contactOpen) {
      const id = setTimeout(() => messageButtonRef.current?.focus({ preventScroll: true }), 0)
      return () => clearTimeout(id)
    }
  }, [contactOpen])

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(HOST_WHATSAPP_NUMBER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <>
      <div className="border-b border-border py-12">
        {/* Section title */}
        <h2 className="mb-6 text-xl font-semibold text-foreground">{t("host.meetHost")}</h2>

        {/* Main host card */}
        <div className="mb-8 rounded-2xl border border-border bg-background p-6 md:flex md:gap-8">
          {/* Avatar + verified */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image
                src="https://a0.muscache.com/im/pictures/user/6bd9646c-2a5d-4a34-b176-e83c14332496.jpg?im_w=720"
                alt="Alpay user profile"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-foreground text-background px-2 py-1 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" />
              <span>{t("host.identityVerified")}</span>
            </div>
          </div>

          {/* Host info + stats */}
          <div className="mt-4 flex-1 md:mt-0 md:pl-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold text-foreground">Alpay</h3>
              <span className="text-sm text-muted-foreground">Host</span>
            </div>

            {/* Stats row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-foreground">
              <div className="flex flex-col">
                <span className="font-medium">311 reviews</span>
                <span className="text-xs text-muted-foreground">Reviews</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-medium">
                  <span>4.64</span>
                  <Star className="h-3.5 w-3.5 fill-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col">
                <span className="font-medium">5 years of hosting</span>
                <span className="text-xs text-muted-foreground">Years hosting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Extra host info: school & languages */}
        <div className="mb-8 grid gap-5 text-sm text-foreground md:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 text-muted-foreground">
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="M26 2a5 5 0 0 1 5 4.78V21a5 5 0 0 1-4.78 5h-6.06L16 31.08 11.84 26H6a5 5 0 0 1-4.98-4.56L1 21.22 1 21V7a5 5 0 0 1 4.78-5H26zm0 2H6a3 3 0 0 0-3 2.82V21a3 3 0 0 0 2.82 3H12.8l3.2 3.92L19.2 24H26a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3H26zM16 6a8.02 8.02 0 0 1 8 8.03A8 8 0 0 1 16.23 22h-.25A8 8 0 0 1 8 14.24v-.25A8 8 0 0 1 16 6zm1.68 9h-3.37c.11 1.45.43 2.76.79 3.68l.09.22.13.3c.23.45.45.74.62.8H16c.33 0 .85-.94 1.23-2.34l.11-.44c.16-.67.29-1.42.34-2.22zm4.24 0h-2.23c-.1 1.6-.42 3.12-.92 4.32a6 6 0 0 0 3.1-4.07l.05-.25zm-9.61 0h-2.23a6 6 0 0 0 3.14 4.32c-.5-1.2-.82-2.71-.91-4.32zm.92-6.32-.13.07A6 6 0 0 0 10.08 13h2.23c.1-1.61.42-3.12.91-4.32zM16 8h-.05c-.27.08-.64.7-.97 1.65l-.13.4a13.99 13.99 0 0 0-.54 2.95h3.37c-.19-2.66-1.1-4.85-1.63-5H16zm2.78.69.02.05c.48 1.19.8 2.68.9 4.26h2.21A6.02 6.02 0 0 0 19 8.8l-.22-.12z" />
              </svg>
            </div>
            <p>Where I went to school: ODTÜ, Ankara</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 text-muted-foreground">
              <svg
                viewBox="0 0 32 32"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path d="M26 2a5 5 0 0 1 5 4.78V21a5 5 0 0 1-4.78 5h-6.06L16 31.08 11.84 26H6a5 5 0 0 1-4.98-4.56L1 21.22 1 21V7a5 5 0 0 1 4.78-5H26zm0 2H6a3 3 0 0 0-3 2.82V21a3 3 0 0 0 2.82 3H12.8l3.2 3.92L19.2 24H26a3 3 0 0 0 3-2.82V7a3 3 0 0 0-2.82-3H26zM16 6a8.02 8.02 0 0 1 8 8.03A8 8 0 0 1 16.23 22h-.25A8 8 0 0 1 8 14.24v-.25A8 8 0 0 1 16 6zm1.68 9h-3.37c.11 1.45.43 2.76.79 3.68l.09.22.13.3c.23.45.45.74.62.8H16c.33 0 .85-.94 1.23-2.34l.11-.44c.16-.67.29-1.42.34-2.22zm4.24 0h-2.23c-.1 1.6-.42 3.12-.92 4.32a6 6 0 0 0 3.1-4.07l.05-.25zm-9.61 0h-2.23a6 6 0 0 0 3.14 4.32c-.5-1.2-.82-2.71-.91-4.32zm.92-6.32-.13.07A6 6 0 0 0 10.08 13h2.23c.1-1.61.42-3.12.91-4.32zM16 8h-.05c-.27.08-.64.7-.97 1.65l-.13.4a13.99 13.99 0 0 0-.54 2.95h3.37c-.19-2.66-1.1-4.85-1.63-5H16zm2.78.69.02.05c.48 1.19.8 2.68.9 4.26h2.21A6.02 6.02 0 0 0 19 8.8l-.22-.12z" />
              </svg>
            </div>
            <p>Speaks English and Turkish</p>
          </div>
        </div>

        {/* Co-hosts */}
        <div className="mb-8">
          <h3 className="mb-4 text-base font-semibold text-foreground">Co-hosts</h3>
          <ul className="flex items-center gap-4">
            <li className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src="https://a0.muscache.com/im/pictures/user/3070b27e-cb53-4011-8507-d0a541c02aa9.jpg?im_w=240"
                  alt="Sıla co-host profile"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-foreground">Sıla</span>
            </li>
          </ul>
        </div>

        {/* Host details + message button */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="mb-1 text-base font-semibold text-foreground">Host details</h3>
            <p className="text-sm text-foreground">Response rate: 90%</p>
            <p className="text-sm text-foreground">Responds within an hour</p>
          </div>

          <button
            ref={messageButtonRef}
            className="inline-flex items-center justify-center rounded-lg bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition-colors hover:bg-foreground/90"
            onClick={() => setContactOpen(true)}
          >
            <span>Message host</span>
          </button>
        </div>

        {/* Safety note */}
        <div className="mt-8 flex items-start gap-4 rounded-xl border border-border bg-secondary/40 px-5 py-4 text-xs text-muted-foreground">
          <div className="mt-0.5 h-6 w-6 text-primary">
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path d="m25 5 .5846837.00517475c4.2905015.07574932 8.8374917.98334075 13.644943 2.73687823l.7703733.28794702v27.3705076l-.0084766.1301365c-.0392237.2994207-.2122236.5656263-.4699074.7230756l-.1154775.0605995-11.4234694 5.0774159c.0623636-.7458456-.0433445-1.4943022-.3209346-2.2783707-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487l-.3317555-.6369277c-.4686141-.9115826-.8248653-1.6297768-1.3147672-2.2052384-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-.4956822.9653459-.9868615 1.9338929-1.47282629 2.9041739l.00159179-19.0721502.769087-.28647781c4.798406-1.75037189 9.3373349-2.65799308 13.6207364-2.73688762z" />
              <path d="m25 1c5.5985197 0 11.5175072 1.27473768 17.7548231 3.81642897.7027419.28641855 1.1783863.94329535 1.2386823 1.69066764l.0064946.16143432v28.73197667c0 1.8999458-1.0758761 3.6285379-2.7638433 4.4721215l-.2054644.0969363-15.0427818 6.6856808c-.4614217.2050763-1.8621146.3276624-2.7955525.3430957l-.192358.0016581.0009065-1.0005013c.6483674-.0069073 1.2843321-.1330366 1.8784107-.3747752.8327784-.3388673 1.5457548-.8939986 2.0790671-1.5885618l13.2600311-5.8942194c1.023196-.4547538 1.7028179-1.4383245 1.7751735-2.5449525l.0064111-.1964822v-28.73197667l-.6916987-.27704554c-5.7517231-2.26330416-11.1871718-3.39148539-16.3083013-3.39148539-5.1211255 0-10.5565697 1.12817946-16.3082877 3.39148006l-.6917123.27707479-.00030284 24.49382405c-.68067737 1.4079172-1.34834149 2.8151846-2.00083161 4.2173468l.00113445-28.71117085c0-.81311953.4922453-1.5453083 1.24525131-1.85215622 6.23725069-2.54166294 12.15623339-3.81639863 17.75474869-3.81639863z" />
              <path d="m15.999908 41.6930234.6867258-.8851772c1.5957359-2.0328613 2.5919668-3.8873951 2.9612752-5.511912.2804314-1.2318637.2318527-2.5167089-.4804505-3.5591688-.6801015-.9952012-1.8642067-1.5894421-3.1673665-1.5894421-1.3033438 0-2.487633.5940563-3.1675505 1.5890729-.7099111 1.039137-.761802 2.3201055-.4810025 3.5580612.3689403 1.6247015 1.3653552 3.4796045 2.9616432 5.5133888l.6867258.8851772.6447715.7192179c1.1495113 1.2599236 2.1735278 2.122579 3.2227536 2.7149739.8151649.4602182 1.6400823.7413704 2.4521191.8358878.8812245.1033783 1.7585848-.0123685 2.559765-.3383795 1.6422905-.6682672 2.8186673-2.1775911 3.0700251-3.9387151.1205267-.8438258.0264975-1.6854363-.2876078-2.572644-.2495178-.7044496-.7667703-1.7805075-1.0418654-2.3950548-1.9094732-4.1561789-3.9589781-8.3688465-6.0912876-12.5211487-.6486357-1.2222643-1.0477537-2.1388241-1.6465227-2.8421661-.743401-.8737317-1.7668654-1.3549948-2.8821508-1.3549948-1.1154695 0-2.1391179.4816323-2.8828868 1.3557332-.6050254.7114646-1.0306408 1.6819288-1.6457867 2.8412431-2.1326775 4.1534098-4.1819984 8.3660775-6.09128759 12.5211487-.28227155.6306079-.79308369 1.6933742-1.04168139 2.3948702-.3141053.8872077-.40813448 1.7288182-.28760784 2.5731978.25117384 1.7609394 1.42736664 3.2700787 3.06965711 3.9385305.81939715.3333951 1.69418134.4397272 2.55958102.3385641.81295679-.0948866 1.63805829-.3760388 2.45248709-.8360724 1.0492258-.5922103 2.0732422-1.4550503 3.2227536-2.7149739z" />
            </svg>
          </div>
          <p>
            To help protect your payment, always use this site to send money and
            communicate with hosts.
          </p>
        </div>
      </div>

      {/* Message host modal */}
      {/* WhatsApp contact modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-xl bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-secondary"
              onClick={() => setContactOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex flex-col items-center gap-4 pt-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-center text-lg font-semibold text-foreground">
                {t("host.contactViaWhatsApp")}
              </h2>
              <p className="text-center text-sm text-muted-foreground">
                {t("host.addHostContact")}
              </p>
              <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 px-4 py-3">
                <span className="text-lg font-semibold tracking-wide text-foreground">
                  {HOST_WHATSAPP_NUMBER}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? t("payment.copied") : t("payment.copy")}
                </button>
              </div>
              <a
                href={HOST_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A]"
              >
                <ExternalLink className="h-4 w-4" />
                {t("host.openInWhatsApp")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
