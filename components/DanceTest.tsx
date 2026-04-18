"use client"

import React, { useState } from "react"

const STORY_LINK = "https://share.crack.wrtn.ai/0ju68r"

const DATA = {
  questions: {
    q1: {
      text: "태양이 가라앉은 짱구 해변,\n당신의 첫 발걸음은 어떤 느낌이야?",
      options: [
        { text: "가볍게 리듬을 타며 사뿐사뿐", next: "q2" },
        { text: "묵직하고 절도 있게 뚜벅뚜벅", next: "q3" },
      ]
    },
    q2: {
      text: "폐공장 사이퍼의 열기가 뜨겁네.\n당신이 보여줄 첫 수는 뭐야?",
      options: [
        { text: "중력을 거스르는 화려한 발기술!", next: "Breaking" },
        { text: "일단 서서 여유롭게 흐름 타기", next: "q4" },
      ]
    },
    q3: {
      text: "어두운 골목에서 누군가 앞을 가로막는다면?",
      options: [
        { text: "심장 박동에 맞춰 몸 근육을 튕긴다", next: "q5" },
        { text: "유연하게 시선을 피하며 우아하게 이동", next: "q6" },
      ]
    },
    q4: {
      text: "분위기가 피크야!\n당신이 선택할 최고의 피날레는?",
      options: [
        { text: "자물쇠가 잠기듯 '철컥' 멈추기", next: "Locking" },
        { text: "영화 속 모델처럼 드라마틱한 포즈!", next: "Voguing" },
        { text: "빠른 비트 위로 쉴 새 없는 발놀림!", next: "House" }, // ✨ 하우스 추가!
      ]
    },
    q5: {
      text: "당신이 보여주고 싶은 카리스마의 색깔은?",
      options: [
        { text: "정교하게 비트를 쪼개는 컨트롤", next: "Popping" },
        { text: "에너지를 거칠게 폭발시키는 날것의 힘", next: "Krump" },
      ]
    },
    q6: {
      text: "이 해변 느와르의 진정한 주인공은 누구일까?",
      options: [
        { text: "화려한 팔 동작으로 시선을 끄는 지배자", next: "Waacking" },
        { text: "파도와 소울에 몸을 완전히 맡긴 자", next: "Hip-hop" },
      ]
    },
  },
  results: {
    Breaking: { title: "브레이킹 (Breaking)", desc: "당신은 짱구 해변의 비보이/비걸!\n거침없는 기술로 바닥을 뒤흔듭니다." },
    Locking: { title: "락킹 (Locking)", desc: "유쾌한 에너지의 소유자!\n'철컥' 멈추는 절도로 시선을 사로잡네요." },
    Voguing: { title: "보깅 (Voguing)", desc: "당신이 걷는 모든 곳이 런웨이!\n드라마틱한 포징의 대가입니다." },
    House: { title: "하우스 (House)", desc: "깃털처럼 가벼운 발놀림!\n끊이지 않는 스텝으로 밤을 지배합니다." },
    Popping: { title: "팝핑 (Popping)", desc: "통제된 카리스마!\n비트를 몸으로 쪼개는 인간 메트로놈입니다." },
    Krump: { title: "크럼프 (Krump)", desc: "내면의 열정을 폭발시키는 파이터!\n폐공장의 열기보다 더 뜨겁군요." },
    Waacking: { title: "왁킹 (Waacking)", desc: "우아하고 화려한 주인공!\n팔을 돌리는 순간 공기가 바뀝니다." },
    "Hip-hop": { title: "힙합 (Hip-hop)", desc: "그루브의 정석.\n파도 소리조차 리듬이 되는 소울 댄서입니다." },
  }
}

export function DanceTest() {
  const [step, setStep] = useState<string>("q1")
  const [result, setResult] = useState<any>(null)

  const handleChoice = (next: string) => {
    if (DATA.results[next as keyof typeof DATA.results]) {
      setResult(DATA.results[next as keyof typeof DATA.results])
    } else {
      setStep(next)
    }
  }

  const reset = () => {
    setStep("q1")
    setResult(null)
  }

  return (
    <div className="mx-auto my-16 w-full max-w-lg rounded-[32px] border-2 border-primary/20 bg-black/40 p-8 shadow-2xl backdrop-blur-xl">
      {!result ? (
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <span className="text-[10px] tracking-[0.4em] text-primary/60 uppercase">DANCE ORIENTATION TEST</span>
            <h2 className="mt-4 whitespace-pre-line font-display text-2xl leading-tight text-foreground neon-pink">
              {DATA.questions[step as keyof typeof DATA.questions].text}
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {DATA.questions[step as keyof typeof DATA.questions].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleChoice(opt.next)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                <span className="relative z-10 text-foreground/80 group-hover:text-primary">{opt.text}</span>
                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-primary/5 to-transparent transition-transform group-hover:translate-y-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-[10px] tracking-[0.4em] text-accent uppercase font-bold">YOUR RHYTHM IS...</span>
          <h2 className="mt-4 text-4xl font-black neon-pink italic tracking-tighter">{result.title}</h2>
          <p className="mt-6 text-lg text-foreground/70 leading-relaxed whitespace-pre-line">{result.desc}</p>
          
          <div className="mt-10 flex flex-col gap-4">
            <a
              href={STORY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center rounded-2xl bg-primary px-8 py-5 font-bold text-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(var(--primary),0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2 text-xl">
                🌴 발리로 이동하기
              </span>
            </a>

            <button
              onClick={reset}
              className="text-sm text-foreground/30 underline underline-offset-4 hover:text-primary transition-colors"
            >
              다시 테스트하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}