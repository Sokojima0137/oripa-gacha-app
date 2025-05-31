// app/gacha/[packId]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { drawGacha } from './actions';

async function getGachaPackById(id: string) {
  const res = await fetch(`http://localhost:8080/api/packs/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return res.json();
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

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <Image
        src={pack.imageUrl}
        alt={pack.name}
        width={400}
        height={400}
        className="mx-auto mb-6 rounded-xl shadow-lg"
      />
      <h1 className="text-2xl font-bold mb-4">{pack.name}</h1>
      <p className="text-gray-600 mb-6">{pack.description}</p>
      
      {/* formのactionに直接サーバー関数をバインドする
          js不要でサーバー処理に直結できる。また関数はサーバー上で実装されるためapiエンドポイントを晒さなくて良い
          また、onClick()などを使おうとするとuse clientになるためクライアントコンポーネントになってしまう。
      */}
      <form action={drawGacha.bind(null, pack.id)}>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-md"
        >
          ガチャを引く
        </button>
      </form>
    </div>
  );
}
