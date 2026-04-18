// 붐박스에서 재생할 직접 업로드한 트랙 목록
export type Track = {
  url: string    // 파일 경로 (public 폴더 기준)
  title: string
  artist: string
  tag: string    // 장면 분위기 태그
}

export const PLAYLIST: Track[] = [
  {
    url: "/01.What To Do [You].mp3",
    title: "What To Do [You]",
    artist: "You",
    tag: "BEACH",
  },
  {
    url: "/02.What To Do [Kai].mp3",
    title: "What To Do [Kai]",
    artist: "Kai",
    tag: "SUNSET",
  },
  {
    url: "/03.Falling in the Free.mp3",
    title: "Falling in the Free",
    artist: "You & Kai",
    tag: "LA LUNA",
  },
  {
    url: "/04.Aussie Drift [Kai’s Theme].mp3",
    title: "Aussie Drift",
    artist: "Kai",
    tag: "FACTORY",
  },
  {
    url: "/05.Saltwater & Silence [Kai&Wayan].mp3",
    title: "Saltwater & Silence",
    artist: "Kai & Wayan",
    tag: "HIDDEN REEF",
  },
  {
    url: "/06.Broken 90°.mp3",
    title: "Broken 90°",
    artist: "Bella",
    tag: "BLACKSAND",
  },
  {
    url: "/07.Gold & Grey-Ruined Youth.mp3",
    title: "Gold & Grey",
    artist: "Ruined Youth",
    tag: "NOIR",
  },
]