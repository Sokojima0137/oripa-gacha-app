import { MetadataRoute } from 'next'
import { Pack } from '@/types/types'

async function getGachaPacks() {
  const res = await fetch('http://localhost:8080/api/packs', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  // 全てのパックを取得
  const packs: Pack[] = await getGachaPacks()

  // 基本的なURLのエントリー
  const staticPaths: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // パックの詳細ページのURLを動的に生成
  const dynamicPaths: MetadataRoute.Sitemap = packs.map((pack) => ({
    url: `${baseUrl}/gacha/${pack.id}`,
    lastModified: new Date(pack.createdAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticPaths, ...dynamicPaths]
} 