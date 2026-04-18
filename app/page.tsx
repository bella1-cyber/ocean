import { BoomboxPlayer } from "@/components/boombox/boombox-player"
import { Battle } from "@/components/sections/battle"
import { Characters } from "@/components/sections/characters"
import { Hero } from "@/components/sections/hero"
import { Locations } from "@/components/sections/locations"
// TO-BE (수정) - 한 단계 위 폴더로 가서 components 폴더를 찾아가라는 뜻이야!
import { DanceTest } from "../components/DanceTest"

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      {/* 히어로 섹션 */}
      <Hero />
      
      {/* 장소 소개 섹션 */}
      <Locations />
      
      {/* NPC 캐릭터 리스트 섹션 */}
      <Characters />
      
      {/* 배틀 액션 섹션 */}
      <Battle />

      {/* 2. 댄스 성향 테스트 섹션 (NPC와 배틀 밑에 배치) */}
      <section className="px-6 py-20 bg-black/20">
        <div className="mx-auto max-w-4xl">
          <DanceTest />
        </div>
      </section>

      {/* 푸터 — 붐박스 플레이어에 가려지지 않게 여백(pb-44)을 줬어! */}
      <footer className="border-t border-foreground/10 bg-[oklch(0.1_0.03_200)] px-6 pb-44 pt-14 text-center">
        <p className="font-display text-2xl uppercase tracking-[0.3em] text-foreground/80">
          <span className="neon-pink">OCEAN</span> <span className="neon-gold">FEVER</span>
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          © 2026 · CANGGU AFTER DARK · FAN PROJECT
        </p>
      </footer>

      {/* 하단 고정 붐박스 플레이어 (항상 화면 밑에 떠 있음) */}
      <BoomboxPlayer />
    </main>
  )
}