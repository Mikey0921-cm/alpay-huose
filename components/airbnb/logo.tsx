"use client"

import Link from "next/link"

type LogoProps = {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

const sizeMap = { sm: "h-6 w-6", md: "h-8 w-8", lg: "h-10 w-10" }
const textSizeMap = { sm: "text-base", md: "text-xl", lg: "text-2xl" }

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Alpay House - 首页"
    >
      {/* Logo: 房子图标（屋顶 + 房体） */}
      <svg
        viewBox="0 0 40 40"
        className={`${sizeMap[size]} shrink-0 text-primary`}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M20 3L3 17v20h10V22h14v15h10V17L20 3z" />
      </svg>
      {showText && (
        <span className={`hidden font-bold tracking-tight text-primary md:block ${textSizeMap[size]}`}>
          Alpay House
        </span>
      )}
    </Link>
  )
}
