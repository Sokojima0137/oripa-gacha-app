// src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';

// 
export const metadata = {
  title: '🎁 オリパガチャ一覧 | オリパコレクション',
  description: 'さまざまなオリパガチャパックを一覧でチェック！お気に入りのパックを見つけよう。',
  openGraph: {
    title: 'オリパガチャ一覧',
    description: '注目のオリパガチャパックをすぐにチェック！',
    url: '',
    siteName: 'オリパコレクション',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'オリパガチャ一覧',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'オリパガチャ一覧',
    description: '注目のオリパガチャパックをすぐにチェック！',
    images: [],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
