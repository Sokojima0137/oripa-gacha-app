// app/page.tsx
// app
import GachaPackCard from '@/components/GachaPackCard';
import { Pack } from '@/types/types';

async function getGachaPacks() {
  const res = await fetch('http://localhost:8080/api/packs', {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

// React Server ComponentsによってSSR化
export default async function Home() {
  const gachaPacks = await getGachaPacks();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gachaPacks.map((pack: Pack) => (
          <GachaPackCard key={pack.id} {...pack} />
        ))}
      </div>
    </div>
  );
}
