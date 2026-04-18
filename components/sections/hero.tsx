import { Flame, MapPin, Music2, Waves } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경: 어두운 열대야 청록 + 네온 핑크/골드 라이트 누수 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% -10%, oklch(0.55 0.25 350 / 0.35), transparent 60%)," +
              "radial-gradient(900px 600px at 90% 20%, oklch(0.78 0.18 88 / 0.22), transparent 60%)," +
              "radial-gradient(700px 500px at 50% 110%, oklch(0.55 0.18 200 / 0.35), transparent 60%)," +
              "linear-gradient(180deg, oklch(0.12 0.04 200) 0%, oklch(0.08 0.03 200) 100%)",
          }}
        />
        {/* 첨부 이미지 사용 시: src 만 교체 */}
        {/* <img src="/ocean-fever-hero.jpg" alt="" className="h-full w-full object-cover opacity-30" /> */}
      </div>

      {/* 스캔라인 */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px)]" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 py-24">
        {/* 상단 라벨 */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-primary">
          <span className="h-[1px] w-8 bg-primary" />
          2026 · CANGGU AFTER DARK
          <span className="h-[1px] w-8 bg-primary" />
        </div>

        {/* 메인 타이틀 — Ocean Fever */}
        <h1 className="mt-8 leading-[0.85]">
          <span className="block font-serif text-5xl italic text-foreground/85 sm:text-6xl">
            a tropical noir
          </span>
          <span className="block font-display text-7xl uppercase tracking-tight text-foreground sm:text-9xl md:text-[10rem]">
            <span className="neon-pink animate-flicker">OCEAN</span>{" "}
            <span className="neon-gold">FEVER</span>
          </span>
          <span className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-[family-name:var(--font-kr-display)] text-3xl text-foreground sm:text-4xl">
              발리 짱구, 한밤의 댄스 파티
            </span>
            <span className="-rotate-3 rounded-sm bg-accent px-2 py-1 font-display text-xs uppercase tracking-widest text-background sm:text-sm">
              짱구 / Canggu
            </span>
          </span>
        </h1>

        {/* 서브 카피 */}
        <p className="mt-8 max-w-2xl text-pretty font-sans text-base leading-relaxed text-foreground/80 sm:text-lg whitespace-pre-line">
  낮의 태양이 가라앉으면 짱구 해변은 다른 얼굴이 된다.
  모래 위 베이스 라인, 폐공장의 사이퍼, 서퍼와 댄서가 뒤엉키는 위험한 로맨스.
  <span className="font-[family-name:var(--font-kr-display)] text-foreground">스텝업</span>의 리듬과 트로피컬 느와르의 그림자가 한 번에 흐르는 이야기.
</p>

        {/* 메타 라인 */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-foreground/65">
          <span className="flex items-center gap-2">
            <Music2 className="h-4 w-4 text-primary" /> Street Dance
          </span>
          <span className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-accent" /> Surf · Sunset
          </span>
          <span className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" /> Night Heat
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" /> Bali · Indonesia
          </span>
        </div>
      </div>
    </section>
  )
}
