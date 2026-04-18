/**
 * 캐릭터 5명을 W 모양으로 배치.
 * Row 1 (top):    K . W . E
 * Row 2 (bottom):  D . T
 */

type Character = {
  slug: string
  name: string
  ko: string
  age: number
  role: string
  type: string
  tagline: string
  accent: string
  color: "primary" | "accent"
  src: string
  initial: string
}

const CHARACTERS: Record<"K" | "D" | "W" | "T" | "E", Character> = {
  K: {
    slug: "kai",
    name: "KAI CHEN",
    ko: "카이 첸",
    age: 27,
    role: "Nomad Surfer / Dancer",
    type: "ESTP · 7w8",
    tagline: "현실적 낙관주의 · 무심한 츤데레",
    accent: "한국계 호주인",
    color: "primary",
    src: "/characters/kai.png",
    initial: "K",
  },
  D: {
    slug: "dante",
    name: "DANTE VALENTI",
    ko: "단테 발렌티",
    age: 34,
    role: "Casino Boss",
    type: "ENTJ · 8w9",
    tagline: "Sadistic Controller · 냉혈 통제광",
    accent: "이탈리아계 미국인",
    color: "accent",
    src: "/characters/dante.png",
    initial: "D",
  },
  W: {
    slug: "wayan",
    name: "WAYAN MEYER",
    ko: "와얀 메이어",
    age: 42,
    role: "Head Lifeguard",
    type: "ISTJ · 9w8",
    tagline: "Stoic Protector · 무뚝뚝한 철벽",
    accent: "발리-네덜란드 혼혈",
    color: "primary",
    src: "/characters/wayan.png",
    initial: "W",
  },
  T: {
    slug: "tyler",
    name: "TYLER EVANS",
    ko: "타일러 에반스",
    age: 25,
    role: "Lifeguard",
    type: "ENFP · 7w6",
    tagline: "Party Animal · 씹인싸 분위기 메이커",
    accent: "호주인",
    color: "accent",
    src: "/characters/tyler.png",
    initial: "T",
  },
  E: {
    slug: "ezra",
    name: "EZRA BARNES",
    ko: "에즈라 반스",
    age: 29,
    role: "Rockstar · Ruined Youth",
    type: "ISFP · 4w3",
    tagline: "Volatile Artist · 퇴폐와 취약함 사이",
    accent: "영국인",
    color: "primary",
    src: "/characters/ezra.png",
    initial: "E",
  },
}

export function Characters() {
  const top = [CHARACTERS.K, CHARACTERS.W, CHARACTERS.E]
  const bottom = [CHARACTERS.D, CHARACTERS.T]

  return (
    <section className="relative bg-gradient-to-b from-[oklch(0.12_0.035_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.12_0.035_200)] py-24">
      {/* 무드 글로우 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">// MAIN CAST</p>
            <h2 className="mt-2">
              <span className="block font-serif text-3xl italic text-foreground/70 sm:text-4xl">five hearts, one beach</span>
              <span className="mt-1 block font-[family-name:var(--font-kr-display)] text-4xl text-foreground sm:text-5xl">
                메인 캐릭터
              </span>
            </h2>
          </div>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-foreground/40 sm:block">
            05 Leads
          </span>
        </div>

        {/* W 배치 */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-5">
            {top.map((c, i) => (
              <div key={c.slug} className="col-span-2">
                <CharCard c={c} index={["K", "W", "E"][i] === "Kai" ? 1 : ["K", "W", "E"][i] === "W" ? 3 : 5} />
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-6 gap-5">
            <div className="col-span-2 col-start-2">
              <CharCard c={bottom[0]} index={2} />
            </div>
            <div className="col-span-2 col-start-4">
              <CharCard c={bottom[1]} index={4} />
            </div>
          </div>
        </div>

        {/* 모바일 / 태블릿 폴백 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {[CHARACTERS.K, CHARACTERS.D, CHARACTERS.W, CHARACTERS.T, CHARACTERS.E].map((c, i) => (
            <CharCard key={c.slug} c={c} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CharCard({ c, index }: { c: Character; index: number }) {
  const colorClass = c.color === "primary" ? "text-primary" : "text-accent"
  const ringClass = c.color === "primary" ? "hover:border-primary/60" : "hover:border-accent/60"

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-lg border border-foreground/10 bg-[oklch(0.18_0.045_200)] transition ${ringClass}`}
    >
      {/* 캐릭터 이미지 */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-br from-[oklch(0.22_0.06_200)] via-[oklch(0.14_0.04_200)] to-[oklch(0.08_0.025_200)]">
        {c.src ? (
          <img
            src={c.src || "/placeholder.svg"}
            alt={`${c.name} / ${c.ko}`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <span
            className={`font-display text-[12rem] leading-none ${
              c.color === "primary" ? "text-primary/15" : "text-accent/15"
            }`}
          >
            {c.initial}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.035_200)] via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_3px)]" />

        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          0{index} / 05
        </span>
      </div>

      {/* 정보 영역 */}
      <div className="p-5">
        {/* ⭐ 나이를 이름 옆으로 딱 붙게 수정 완료! */}
        <div className="flex items-baseline gap-2">
          <h3 className={`font-display text-2xl uppercase tracking-tight ${colorClass}`}>
            {c.name}
          </h3>
          <span className="font-mono text-xs text-foreground/40">· {c.age}</span>
        </div>
        
        <p className="mt-1 font-[family-name:var(--font-kr-display)] text-lg text-foreground">{c.ko}</p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-foreground/55">
          {c.role} · {c.accent}
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/75">{c.tagline}</p>

        {/* MBTI / 에니어그램 */}
        <div className="mt-5 flex items-center justify-between border-t border-foreground/10 pt-3">
          <span
            className={`rounded-sm border px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.25em] ${
              c.color === "primary"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-accent/40 bg-accent/10 text-accent"
            }`}
          >
            {c.type}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            personality
          </span>
        </div>
      </div>
    </article>
  )
}