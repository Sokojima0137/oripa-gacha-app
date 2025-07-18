"use client";
import { Pack } from "@/types/types";
import { useRouter } from "next/navigation";

export default function GachaPackCard({ id, name, imageUrl }: Pack) {
  const router = useRouter();
  
  return (
    <div
      onClick={() => router.push(`/gacha/${id}`)}
      className="cursor-pointer hover:scale-105 transition transform rounded-xl shadow-md p-4"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-auto rounded-lg"
      />
      <h2 className="text-center text-lg font-bold mt-2">{name}</h2>
    </div>
  );
}
