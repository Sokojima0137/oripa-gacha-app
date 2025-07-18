// app/gacha/[packId]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { drawGacha } from './actions';
import { Pack, Item } from '@/types/types';

async function getGachaPackById(id: string) {
  const res = await fetch(`http://localhost:8080/api/packs/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
}

async function getPackItems(packId: string) {
  try {
    console.log(`[Server] Fetching items for pack: ${packId}`);
    const res = await fetch(`http://localhost:8080/api/packs/${packId}/items`, {
      cache: 'no-store'
    });
    
    console.log(`[Server] Items API Response Status: ${res.status}`);
    
    if (!res.ok) {
      console.log(`[Server] Items API Error: ${res.statusText}`);
      return [];
    }
    
    const items: Item[] = await res.json();
    console.log(`[Server] Items fetched: ${items.length}`);
    console.log(`[Server] Items data:`, items);
    
    // 重複を除去して一意な商品リストを作成
    const uniqueItems = Array.from(new Map(items.map(item => [item.name, item])).values());
    console.log(`[Server] Unique items: ${uniqueItems.length}`);
    
    return uniqueItems;
  } catch (error) {
    console.error(`[Server] Error fetching pack items:`, error);
    return [];
  }
}

// SSRのタイミングでメタ情報生成
// 各ページでgenerateMetadataを定義することで動的にメタ情報を設定可能
// Next.js15のApp Router機能
export async function generateMetadata({ params }: { params: { packId: string } }) {
  const pack: Pack = await getGachaPackById(params.packId);

  if (!pack) {
    return {
      title: 'ガチャパックが見つかりません',
      description: '指定されたガチャパックが見つかりませんでした。',
    };
  }

  return {
    title: `${pack.name} | オリパコレクション`,
    description: `${pack.description}`,
    openGraph: {
      title: `${pack.name} | オリパコレクション`,
      description: `${pack.description}`,
      images: [
        {
          url: pack.imageUrl,
          width: 1200,
          height: 630,
          alt: pack.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pack.name} | オリパコレクション`,
      images: [pack.imageUrl],
    },
  };
}

export default async function GachaPackPage({ params }: { params: { packId: string } }) {
  const pack: Pack = await getGachaPackById(params.packId);
  if (!pack) return notFound();

  const items = await getPackItems(params.packId);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* パック情報 */}
        <div className="text-center">
          <Image
            src={pack.imageUrl}
            alt={pack.name}
            width={400}
            height={400}
            className="mx-auto rounded-xl shadow-lg mb-6"
          />
          <h1 className="text-2xl font-bold mb-4">{pack.name}</h1>
          <p className="text-gray-600 mb-6">{pack.description}</p>
          
          <form action={drawGacha.bind(null, pack.id)} className="mb-4">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg rounded-lg shadow-md transition-colors"
            >
              ガチャを引く
            </button>
          </form>
        </div>

        {/* 商品一覧 */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">商品一覧</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative mb-2">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-sm font-medium mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
