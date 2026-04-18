import { BoomboxPlayer } from "@/components/boombox/boombox-player"
import { Battle } from "@/components/sections/battle"
import { Characters } from "@/components/sections/characters"
import { Hero } from "@/components/sections/hero"
import { Locations } from "@/components/sections/locations"
import { DanceTest } from "../components/DanceTest"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      {/* 1. 원래 있던 섹션들 */}
      <Hero />
      <Locations />
      <Characters />
      <Battle />

      {/* 2. 댄스 테스트 섹션 */}
      <section id="dance-test" className="relative z-10 w-full py-20">
        <DanceTest />
      </section>

      {/* 3. 푸터 */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] px-6 pb-44 pt-20 text-center">
        <p className="font-display text-2xl uppercase tracking-[0.3em] text-white/90">
          <span className="text-[#ff0096]">OCEAN</span> <span className="text-[#ffd700]">FEVER</span>
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          © 2026 · CANGGU AFTER DARK · FAN PROJECT
        </p>
      </footer>

      {/* 4. 고정 붐박스 */}
      <BoomboxPlayer />
    </main>
  )
}