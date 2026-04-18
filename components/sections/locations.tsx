const LOCATIONS = [
  {
    name: "CANGGU BEACH & TOWER",
    ko: "짱구 비치 & 타워",
    time: "DAY",
    desc: "낮의 권력. 로컬 서퍼들의 성지이자 라이프가드 와얀의 구역.",
    accent: "from-accent/60 to-accent/0",
  },
  {
    name: "THE FACTORY",
    ko: "더 팩토리",
    time: "NIGHT",
    desc: "밤의 권력. 외곽 폐공장. 표면은 댄스 배틀장, 실체는 VIP 불법 도박장.",
    accent: "from-primary/70 to-primary/0",
  },
  {
    name: "EL CANGGU FOOD TRUCK",
    ko: "엘 짱구 푸드트럭",
    time: "MIDDAY",
    desc: "해변 정보가 오가는 교차로. 노동과 식사가 맞물려 거래되는 곳.",
    accent: "from-accent/60 to-accent/0",
  },
  {
    name: "HIDDEN REEF",
    ko: "히든 리프",
    time: "DUSK",
    desc: "인적 드문 해변. 은밀한 밀회와 야외 노출에 최적화된 프라이빗 스팟.",
    accent: "from-primary/50 to-primary/0",
  },
  {
    name: "BLACKSAND PUB",
    ko: "블랙샌드 펍",
    time: "NIGHT",
    desc: "서퍼와 거리 댄서들의 아지트. 끈적한 베이스, 값싼 데킬라, 잦은 주먹다짐.",
    accent: "from-accent/50 to-accent/0",
  },
  {
    name: "LA LUNA BEACH CLUB",
    ko: "라 루나 비치 클럽",
    time: "LATE NIGHT",
    desc: "자본과 쾌락의 정점. 핑크 조명의 인피니티 풀과 VIP 카바나. 에즈라 출몰지.",
    accent: "from-primary/80 to-primary/0",
  },
]

export function Locations() {
  return (
    <section className="relative border-y border-foreground/10 bg-[oklch(0.13_0.035_200)] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary">// LOCATIONS</p>
            <h2 className="mt-2">
              <span className="block font-serif text-3xl italic text-foreground/70 sm:text-4xl">where the night moves</span>
              <span className="mt-1 block font-[family-name:var(--font-kr-display)] text-4xl text-foreground sm:text-5xl">
                세계관 & 주요 장소
              </span>
            </h2>
          </div>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-foreground/40 sm:block">
            06 Hotspots
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {LOCATIONS.map((loc, i) => (
            <article
              key={loc.name}
              className="group relative overflow-hidden rounded-lg border border-foreground/10 bg-gradient-to-b from-[oklch(0.2_0.045_200)] to-[oklch(0.13_0.035_200)] p-6 transition hover:border-primary/60"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${loc.accent} opacity-60 blur-3xl transition group-hover:opacity-100`}
              />

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  0{i + 1} · {loc.time}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_oklch(0.7_0.27_350_/_0.9)]" />
              </div>

              <h3 className="mt-4 font-display text-2xl uppercase tracking-tight text-foreground">{loc.name}</h3>
              <p className="mt-1 font-[family-name:var(--font-kr-display)] text-lg text-primary">{loc.ko}</p>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/75">{loc.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
