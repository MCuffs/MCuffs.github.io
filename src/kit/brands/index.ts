/** Local product artwork. No network lookup or runtime icon service. */
export type BrandAsset = {
  name: string
  category: 'Payments' | 'Banks' | 'Apps' | 'Crypto'
  light: string
  dark: string
  tileArtwork?: string
  tileBackground?: string
  proportion: number
  scale: number
}

// 이 사이트는 타사 로고를 쓰지 않으므로 등록부를 비워 둠(원본 키트의 SVG는 배포에 넣지 않음)
export const brandMarks: Record<string, BrandAsset> = {}

export type BrandName = string
