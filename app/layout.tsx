import type { Metadata } from "next"
import { Bodoni_Moda, Archivo_Black, Black_Han_Sans, Noto_Sans_KR, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// 본문(한글 + 영문 보조)
const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
})

// 한글 디스플레이(헤드라인 볼드)
const blackHan = Black_Han_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kr-display",
  display: "swap",
  fallback: ["sans-serif"],
})

// 영문 디스플레이(스트릿 볼드 산세리프)
const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

// 영문 세리프(스타일리시 강조)
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

// 모노(태그/카운터)
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Ocean Fever · Bali Canggu Street Dance",
  description:
    "발리 짱구 해변의 밤. 스트릿 댄스, 서퍼, 위험한 로맨스. 트로피컬 느와르 × 스텝업 무드의 Ocean Fever.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  themeColor: "#04141a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${notoKR.variable} ${geistMono.variable} ${archivo.variable} ${bodoni.variable} ${blackHan.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
