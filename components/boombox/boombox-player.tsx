"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Pause, Play, Power, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { PLAYLIST } from "@/lib/playlist"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
}

export function BoomboxPlayer({ className }: Props) {
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPowered, setIsPowered] = useState(true)
  const [volume, setVolume] = useState(60)

  // 오디오 객체를 담을 Ref
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const track = PLAYLIST[index]

  // 1. 오디오 초기화
  useEffect(() => {
    audioRef.current = new Audio(track.url)
    
    // 곡이 끝나면 다음 곡으로
    audioRef.current.onended = () => {
      next()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // 2. 트랙 변경 감지
  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = isPlaying
    audioRef.current.src = track.url
    audioRef.current.load()
    
    if (wasPlaying && isPowered) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [index])

  // 3. 재생/일시정지 상태 반영
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying && isPowered) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, isPowered])

  // 4. 볼륨 반영
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % PLAYLIST.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
  }, [])

  const togglePlay = useCallback(() => {
    if (!isPowered) return
    setIsPlaying((prev) => !prev)
  }, [isPowered])

  const togglePower = useCallback(() => {
    if (isPowered) {
      setIsPlaying(false)
      setIsPowered(false)
    } else {
      setIsPowered(true)
    }
  }, [isPowered])

  return (
    <div className={cn("pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3", className)}>
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-3xl rounded-[28px] border-2 border-foreground/15",
          "bg-gradient-to-b from-[oklch(0.22_0.05_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.08_0.025_200)]",
          "px-4 py-3 sm:px-6 sm:py-4",
          "shadow-[0_30px_80px_-20px_oklch(0.55_0.27_350_/_0.45),0_10px_40px_-10px_oklch(0.55_0.18_200_/_0.5),inset_0_1px_0_rgba(255,255,255,0.08)]",
          !isPowered && "opacity-80",
        )}
      >
        {/* 손잡이/안테나 UI (기존과 동일) */}
        <div className="absolute left-1/2 top-[-14px] h-3 w-28 -translate-x-1/2 rounded-t-lg border-2 border-b-0 border-foreground/20 bg-gradient-to-b from-[oklch(0.28_0.05_200)] to-[oklch(0.14_0.04_200)] sm:w-40" />
        

        <div className="flex items-center gap-3 sm:gap-5">
          <Speaker spinning={isPlaying && isPowered} />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* 디스플레이 */}
            <button
              type="button"
              onClick={next}
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

              {/* 이퀄라이저 애니메이션 */}
              <div className="mt-2 flex h-3 items-end gap-[2px]">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-[3px] rounded-sm transition-all",
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

            {/* 컨트롤 섹션 */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <ControlBtn onClick={prev}><SkipBack className="h-4 w-4" /></ControlBtn>
                <ControlBtn onClick={togglePlay} primary>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </ControlBtn>
                <ControlBtn onClick={next}><SkipForward className="h-4 w-4" /></ControlBtn>
                <ControlBtn onClick={togglePower}>
                  <Power className={cn("h-4 w-4", isPowered ? "text-accent" : "text-foreground/40")} />
                </ControlBtn>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <Volume2 className="h-3.5 w-3.5 text-foreground/55" />
                <input
                  type="range" min={0} max={100} value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
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

// 스피커 & 버튼 컴포넌트 (기존 UI 로직 유지)
function Speaker({ spinning }: { spinning: boolean }) {
  return (
    <div className="relative aspect-square w-20 shrink-0 sm:w-28">
      <div className="absolute inset-0 rounded-full border-2 border-foreground/15 bg-gradient-to-br from-[oklch(0.26_0.05_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.06_0.02_200)]" />
      <div className={cn(
        "absolute inset-[14px] rounded-full border border-foreground/20 bg-[radial-gradient(circle_at_35%_35%,oklch(0.4_0.13_350),oklch(0.1_0.04_200))]",
        spinning && "animate-spin-slow"
      )}>
        <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_oklch(0.7_0.27_350_/_0.7)]" />
      </div>
    </div>
  )
}

function ControlBtn({ children, primary, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { primary?: boolean }) {
  return (
    <button
      type="button" {...props}
      className={cn(
        "flex items-center justify-center rounded-full border border-foreground/15",
        "bg-gradient-to-b from-[oklch(0.26_0.05_200)] to-[oklch(0.08_0.025_200)]",
        "text-foreground/85 shadow-lg active:translate-y-[1px]",
        primary ? "h-10 w-10 text-primary" : "h-8 w-8 hover:text-primary",
      )}
    >
      {children}
    </button>
  )
}