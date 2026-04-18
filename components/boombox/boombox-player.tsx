"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, Power, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { PLAYLIST } from "@/lib/playlist"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    YT?: any
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<void> | null = null
function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.YT && window.YT.Player) return Promise.resolve()
  if (apiPromise) return apiPromise

  apiPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-yt-api]")
    if (!existing) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.async = true
      tag.dataset.ytApi = "1"
      document.head.appendChild(tag)
    }
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve()
    }
    // 스크립트가 이미 로드된 경우 대비
    const checker = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checker)
        resolve()
      }
    }, 100)
  })
  return apiPromise
}

type Props = {
  className?: string
}

export function BoomboxPlayer({ className }: Props) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPowered, setIsPowered] = useState(true)
  const [volume, setVolume] = useState(60)
  const [ready, setReady] = useState(false)

  const playerRef = useRef<any>(null)
  const mountRef = useRef<HTMLDivElement | null>(null)

  const track = PLAYLIST[index]

  // YouTube Player 초기화 (클라이언트 전용)
  useEffect(() => {
    let cancelled = false
    if (!mountRef.current) return

    loadYouTubeAPI().then(() => {
      if (cancelled || !mountRef.current || !window.YT?.Player) return
      // 마운트 포인트 초기화
      mountRef.current.innerHTML = ""
      const holder = document.createElement("div")
      mountRef.current.appendChild(holder)

      playerRef.current = new window.YT.Player(holder, {
        height: "0",
        width: "0",
        videoId: PLAYLIST[0].videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.setVolume(60)
            } catch {}
            setReady(true)
          },
          onStateChange: (e: any) => {
            // 0: ended, 1: playing, 2: paused
            if (e.data === 1) setIsPlaying(true)
            else if (e.data === 2) setIsPlaying(false)
            else if (e.data === 0) setIndex((i) => (i + 1) % PLAYLIST.length)
          },
        },
      })
    })

    return () => {
      cancelled = true
      try {
        playerRef.current?.destroy?.()
      } catch {}
      playerRef.current = null
    }
  }, [])

  // 트랙 변경 시 로드
  useEffect(() => {
    if (!ready || !playerRef.current) return
    try {
      if (isPowered) {
        playerRef.current.loadVideoById(track.videoId)
      } else {
        playerRef.current.cueVideoById(track.videoId)
      }
    } catch {}
  }, [index, ready, track.videoId, isPowered])

  // 볼륨 반영
  useEffect(() => {
    if (!ready || !playerRef.current) return
    try {
      playerRef.current.setVolume(volume)
    } catch {}
  }, [volume, ready])

  const next = useCallback(() => setIndex((i) => (i + 1) % PLAYLIST.length), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length), [])

  const togglePlay = useCallback(() => {
    if (!ready || !playerRef.current) return
    try {
      if (isPlaying) playerRef.current.pauseVideo()
      else playerRef.current.playVideo()
    } catch {}
  }, [isPlaying, ready])

  const togglePower = useCallback(() => {
    if (!playerRef.current) return
    try {
      if (isPowered) {
        playerRef.current.pauseVideo()
        setIsPowered(false)
      } else {
        setIsPowered(true)
      }
    } catch {}
  }, [isPowered])

  return (
    <div className={cn("pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3", className)}>
      {/* 숨겨진 YouTube iframe 마운트 포인트 */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      />

      {/* 붐박스 UI */}
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-3xl rounded-[28px] border-2 border-foreground/15",
          "bg-gradient-to-b from-[oklch(0.22_0.05_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.08_0.025_200)]",
          "px-4 py-3 sm:px-6 sm:py-4",
          "shadow-[0_30px_80px_-20px_oklch(0.55_0.27_350_/_0.45),0_10px_40px_-10px_oklch(0.55_0.18_200_/_0.5),inset_0_1px_0_rgba(255,255,255,0.08)]",
          !isPowered && "opacity-80",
        )}
      >
        {/* 손잡이 */}
        <div className="absolute left-1/2 top-[-14px] h-3 w-28 -translate-x-1/2 rounded-t-lg border-2 border-b-0 border-foreground/20 bg-gradient-to-b from-[oklch(0.28_0.05_200)] to-[oklch(0.14_0.04_200)] sm:w-40" />

        {/* 안테나 */}
        <div className="absolute right-8 top-[-34px] h-8 w-[2px] rotate-12 rounded-full bg-foreground/40 sm:right-12 sm:h-12" />
        <div className="absolute right-8 top-[-36px] h-[6px] w-[6px] rotate-12 rounded-full bg-primary shadow-[0_0_8px_oklch(0.7_0.27_350)] sm:right-12" />

        <div className="flex items-center gap-3 sm:gap-5">
          <Speaker spinning={isPlaying && isPowered} />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* 디스플레이 — 클릭 시 다음 곡 */}
            <button
              type="button"
              onClick={next}
              aria-label="다음 곡으로 넘기기"
              className="group relative overflow-hidden rounded-md border border-primary/50 bg-[oklch(0.1_0.03_200)] px-3 py-2 text-left transition hover:border-primary"
            >
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />

              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/85">
                  {isPowered ? (isPlaying ? "▶ NOW PLAYING" : "|| PAUSED") : "— OFF —"}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {String(index + 1).padStart(2, "0")} / {String(PLAYLIST.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-1 overflow-hidden">
                <div
                  className={cn(
                    "whitespace-nowrap font-display text-base uppercase tracking-wide sm:text-lg",
                    "neon-pink",
                    isPlaying && isPowered && "animate-marquee",
                  )}
                >
                  {isPowered ? `${track.title} — ${track.artist}` : "— SYSTEM OFFLINE —"}
                </div>
              </div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="rounded-sm border border-accent/50 bg-accent/15 px-1.5 py-[1px] font-mono text-[9px] uppercase tracking-widest text-accent">
                  {track.tag}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary/70 transition group-hover:text-primary">
                  TAP TO SKIP ▸
                </span>
              </div>

              {/* 이퀄라이저 */}
              <div className="mt-2 flex h-3 items-end gap-[2px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-[3px] rounded-sm",
                      isPlaying && isPowered
                        ? i % 3 === 0
                          ? "animate-eq bg-accent"
                          : "animate-eq bg-primary"
                        : "h-[3px] bg-primary/30",
                    )}
                    style={{
                      animationDelay: `${i * 60}ms`,
                      animationDuration: `${600 + (i % 5) * 120}ms`,
                    }}
                  />
                ))}
              </div>
            </button>

            {/* 컨트롤 */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ControlBtn onClick={prev} aria-label="이전 곡">
                  <SkipBack className="h-4 w-4" />
                </ControlBtn>
                <ControlBtn onClick={togglePlay} aria-label={isPlaying ? "일시정지" : "재생"} primary>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </ControlBtn>
                <ControlBtn onClick={next} aria-label="다음 곡">
                  <SkipForward className="h-4 w-4" />
                </ControlBtn>
                <ControlBtn onClick={togglePower} aria-label="전원">
                  <Power className={cn("h-4 w-4", isPowered ? "text-accent" : "text-foreground/40")} />
                </ControlBtn>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <Volume2 className="h-3.5 w-3.5 text-foreground/55" />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  aria-label="볼륨"
                  className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-foreground/20 accent-primary"
                />
              </div>
            </div>
          </div>

          <Speaker spinning={isPlaying && isPowered} />
        </div>
      </div>
    </div>
  )
}

function Speaker({ spinning }: { spinning: boolean }) {
  return (
    <div className="relative aspect-square w-20 shrink-0 sm:w-28">
      <div className="absolute inset-0 rounded-full border-2 border-foreground/15 bg-gradient-to-br from-[oklch(0.26_0.05_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.06_0.02_200)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.85),inset_0_-2px_6px_rgba(255,255,255,0.05)]" />
      <div className="absolute inset-[6px] rounded-full border border-foreground/10 bg-[radial-gradient(circle_at_30%_30%,oklch(0.32_0.07_200),oklch(0.08_0.025_200))]" />
      <div
        className={cn(
          "absolute inset-[14px] rounded-full border border-foreground/20 bg-[radial-gradient(circle_at_35%_35%,oklch(0.4_0.13_350),oklch(0.1_0.04_200))] shadow-[inset_0_4px_10px_rgba(0,0,0,0.9)]",
          spinning && "animate-spin-slow",
        )}
      >
        <div className="absolute inset-[10%] rounded-full border border-foreground/10" />
        <div className="absolute inset-[25%] rounded-full border border-foreground/10" />
        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_oklch(0.7_0.27_350_/_0.7)]" />
      </div>
    </div>
  )
}

function ControlBtn({
  children,
  primary,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "flex items-center justify-center rounded-full border border-foreground/15",
        "bg-gradient-to-b from-[oklch(0.26_0.05_200)] to-[oklch(0.08_0.025_200)]",
        "text-foreground/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.6)]",
        "transition active:translate-y-[1px]",
        primary ? "h-10 w-10 text-primary hover:text-primary" : "h-8 w-8 hover:text-primary",
      )}
    >
      {children}
    </button>
  )
}
