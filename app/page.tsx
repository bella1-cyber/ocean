import { BoomboxPlayer } from "@/components/boombox/boombox-player"
import { Battle } from "@/components/sections/battle"
import { Characters } from "@/components/sections/characters"
import { Hero } from "@/components/sections/hero"
import { Locations } from "@/components/sections/locations"
// 1. 댄스 테스트 컴포넌트 불러오기 (방금 만든 거!)
import { DanceTest } from "@/components/DanceTest"

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <Hero />
      <Locations />
      <Characters />
      <Battle />

      {/* 2. NPC 리스트와 배틀 섹션 밑에 댄스 테스트 배치 */}
      <section className="px-6 py-10">
        <DanceTest />
      </section>

      {/* 푸터 — 붐박스 가림 방지 여백 */}
      <footer className="border-t border-foreground/10 bg-[oklch(0.1_0.03_200)] px-6 pb-44 pt-14 text-center">
        <p className="font-display text-2xl uppercase tracking-[0.3em] text-foreground/80">
          <span className="neon-pink">OCEAN</span> <span className="neon-gold">FEVER</span>
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          © 2026 · CANGGU AFTER DARK
        </p>
      </footer>

      {/* 하단 고정 붐박스 플레이어 */}
      <BoomboxPlayer />
    </main>
  )
}