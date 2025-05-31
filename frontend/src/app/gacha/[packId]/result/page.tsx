// app/gacha/[packId]/result/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { drawGacha } from '../actions';

export default function GachaResultPage({ params, searchParams }: {
  params: { packId: string };
  searchParams: { item?: string; stock?: string };
}) {
  if (!searchParams.item || !searchParams.stock) return notFound();

  const item = JSON.parse(searchParams.item);
  const stock = parseInt(searchParams.stock);

  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 ガチャ結果 🎉</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={300}
          height={300}
          className="mx-auto rounded-lg shadow mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-600 mb-2">レアリティ: {item.rarity}</p>
        <p className="text-sm text-gray-500 mb-4">残り在庫数: {stock} 個</p>
        <form action={drawGacha.bind(null, params.packId)} className="mb-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            もう一度引く
          </button>
        </form>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← パック一覧に戻る
        </Link>
      </div>
    </div>
  );
}
