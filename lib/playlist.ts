// 붐박스에서 재생할 YouTube 트랙 목록
// videoId 는 YouTube URL 의 v= 파라미터 값입니다.
// 예: https://www.youtube.com/watch?v=jfKfPfyJRdk  →  videoId: "jfKfPfyJRdk"
// 아래 목록을 원하는 곡들로 자유롭게 교체하세요.

export type Track = {
  videoId: string
  title: string
  artist: string
  tag: string // 장면 분위기 태그 (BEACH / FACTORY / CLUB 등)
}

export const PLAYLIST: Track[] = [
  {
    videoId: "jfKfPfyJRdk",
    title: "Lofi Beats",
    artist: "Lofi Girl",
    tag: "BEACH",
  },
  {
    videoId: "5yx6BWlEVcY",
    title: "Chillhop Radio",
    artist: "Chillhop Music",
    tag: "SUNSET",
  },
  {
    videoId: "rUxyKA_-grg",
    title: "Synthwave Radio",
    artist: "Lofi Girl",
    tag: "FACTORY",
  },
  {
    videoId: "4xDzrJKXOOY",
    title: "Synthwave Mix",
    artist: "The Bootleg Boy",
    tag: "LA LUNA",
  },
  {
    videoId: "tNkZsRW7h2c",
    title: "Space Ambient",
    artist: "Lofi Girl",
    tag: "HIDDEN REEF",
  },
  {
    videoId: "28KRPhVzCus",
    title: "Jazz Lofi",
    artist: "Chillhop",
    tag: "BLACKSAND",
  },
]
