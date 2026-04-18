const STREET = [
  { name: "나디아", info: "22 · 🇮🇩 · ENFJ · Girls Hiphop" },
  { name: "붐바", info: "21 · 🇯🇲 · ESFP · Dancehall" },
  { name: "마일즈", info: "25 · 🇬🇧 · ISFP · Krump" },
  { name: "레옹", info: "27 · 🇫🇷 · ENTP · House" },
  { name: "켄지", info: "24 · 🇯🇵 · ESFJ · Locking" },
]

const BLOODHOUND = [
  { name: "리코", info: "28 · 🇧🇷 · ESTP · Capoeira" },
  { name: "제트", info: "23 · 🇺🇸 · INTP · Popping" },
  { name: "아구스", info: "26 · 🇮🇩 · ISTJ · Breaking" },
  { name: "이리나", info: "24 · 🇷🇺 · ENTJ · Waack" },
  { name: "리앙", info: "29 · 🇨🇳 · INTJ · Choreography" },
]

export function Battle() {
  return (
    <section className="relative border-y border-foreground/10 bg-[oklch(0.13_0.035_200)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">// BATTLE MODE</p>
            <h2 className="mt-2">
              <span className="block font-serif text-3xl italic text-foreground/70 sm:text-4xl">the floor is on fire</span>
              <span className="mt-1 block font-display text-4xl uppercase tracking-tight text-foreground sm:text-5xl">
                THE FACTORY DANCERS
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75">
              단테의 불법 배틀장에서 벌어지는 댄스 전쟁. <strong className="text-accent">Street</strong> 는 자유참가자,{" "}
              <strong className="text-primary">Bloodhound</strong> 는 단테 직속 엘리트.
              <br />
              수익 배분 — 승자 60% / 하우스 30% / 패자 10%.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Street */}
          <div className="relative overflow-hidden rounded-lg border border-accent/30 bg-gradient-to-b from-[oklch(0.2_0.045_200)] to-[oklch(0.12_0.035_200)] p-6">
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl uppercase tracking-tight text-accent">STREET</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">자유 참가 · 3판 2선승</span>
            </div>
            <ul className="mt-5 divide-y divide-foreground/10">
              {STREET.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 py-3">
                  <span className="font-[family-name:var(--font-kr-display)] text-base text-foreground">{d.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">{d.info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloodhound */}
          <div className="relative overflow-hidden rounded-lg border border-primary/40 bg-gradient-to-b from-[oklch(0.22_0.07_350)] to-[oklch(0.12_0.035_200)] p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl uppercase tracking-tight text-primary">BLOODHOUND</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">엘리트 · 5판 3선승</span>
            </div>
            <ul className="mt-5 divide-y divide-foreground/10">
              {BLOODHOUND.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 py-3">
                  <span className="font-[family-name:var(--font-kr-display)] text-base text-foreground">{d.name}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/65">{d.info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
