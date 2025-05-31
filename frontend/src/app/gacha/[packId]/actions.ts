'use server';  // サーバー上で動くよう明示

import { redirect } from 'next/navigation';

// Server Actions
export async function drawGacha(packId: string) {
  const res = await fetch(`http://localhost:8080/api/draw/${packId}`);
  if (!res.ok) throw new Error('ガチャAPIエラー');
  const data = await res.json();

  redirect(`/gacha/${packId}/result?item=${encodeURIComponent(JSON.stringify(data.item))}&stock=${data.stock}`);
}