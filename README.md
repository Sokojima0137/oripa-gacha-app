# README.md

## プロジェクト概要
本プロジェクトは、React 19 および Next.js 15 の最新機能を活用した、ガチャ抽選アプリのフロントエンド実装です。

## ディレクトリ構成
```
/frontend
├── app
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.csss
│   └── gacha
│       ├── [packId]
│       │   ├── page.tsx
│       │   └── result
│       │       └── page.tsx
│ 　　　 ├── actions.ts
│       └── page.tsx
├── components
│   └──  GachaPackCard.tsx
├── tsconfig.json
└── next.config.js
```

## 使用技術
- React 19 (Stable)
- Next.js 15
- App Router
- Server Actions
- Tailwind CSS

##　React 19 の新機能の利用
### 1. React Server Components
- .tsxファイルではuse clientがなけれはサーバーで実行されるコンポーネント
- 本アプリではガチャ一覧画面、ガチャ詳細画面をサーバーコンポーネントとすることでSEOに強い形として構築している 

## Next.js 15 の新機能の利用

### 1. Server Actions (`"use server"`)
- `/app/gacha/[packId]/result/page.tsx` 内で Server Action を利用して、サーバー側で抽選を行い、結果をレスポンスする
- サーバーサイドロジックをクライアントに暴露せずに実装できる
- サーバー側で処理されるのでサーバーコンポーネントとして扱うことができSEOに強い形としている

```tsx
"use server"
export async function drawGacha(packId: string): Promise<GachaResult> {
  const res = await fetch(...)
  return await res.json()
}
```

### 2. App Router
- `pages` ディレクトリを使わず `app/` ディレクトリを使用
- Layouts, Server Components, Loading UI が構築的に配置される
- app/ 配下のコンポーネントは デフォルトで Server Componentとなる

### 3. 静的キャッシュ・ストリーミング
- `fetch` に `cache: 'no-store'` を指定し、最新状態を確実に取得

### 4. メタデータ管理
- 各ページで generateMetadata() を定義し、SSR時にOGP・title・metaを動的生成しSEOに強い形とした

## 起動方法

```bash
# 1. モジュールのインストール
npm install

# 2. 開発サーバ起動
npm run dev

# 3. アクセス
http://localhost:3000
```

---

## 導入注意点
- React 19 の使用には完全な TypeScript v5.4 以上が必要
- Next.js 15 は 「appディレクトリ」必須
- Server Actions 使用時は必ず `"use server"` の指定

---