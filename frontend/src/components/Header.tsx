'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const mainMenuItems = [
    { name: 'トップ', href: '/' },
    { name: '鑑定品', href: '/certified' },
    { name: 'ポケモン', href: '/pokemon' },
    { name: 'ワンピース', href: '/onepiece' },
    { name: 'ホビー', href: '/hobby' },
    { name: 'フィギュア', href: '/figure' },
    { name: '遊戯王', href: '/yugioh' },
    { name: 'MTG', href: '/mtg' },
    { name: 'ドラゴンボール', href: '/dragonball' },
    { name: 'ヴァイス', href: '/weiss' },
    { name: 'デュエマ', href: '/duema' },
  ];

  const subMenuItems = [
    { name: '全部', href: '/' },
    { name: '1日1回限定', href: '/daily' },
    { name: 'ギリ景付き', href: '/with-bonus' },
    { name: 'ラストワン景付き', href: '/last-one' },
    { name: 'エクストラ景付き', href: '/extra' },
    { name: '鑑定品', href: '/certified' },
    { name: 'リーリエ', href: '/lillie' },
    { name: 'アセロラ', href: '/acerola' },
    { name: 'ピカチュウ', href: '/pikachu' },
  ];

  return (
    <header className="w-full shadow-md">
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold">
              オリパコレクション
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Right Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                会員登録/ログイン
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
            <div className="flex flex-col space-y-4">
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>検索</span>
              </button>
              <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>言語設定</span>
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full">
                会員登録/ログイン
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex space-x-8 whitespace-nowrap">
              {mainMenuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-4 px-1 border-b-2 text-sm md:text-base ${
                      pathname === item.href
                        ? 'border-red-500 text-red-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sub Navigation */}
        <nav className="bg-gray-50 border-t border-gray-200 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex space-x-6 whitespace-nowrap">
              {subMenuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-3 px-2 text-xs md:text-sm ${
                      pathname === item.href
                        ? 'text-red-500'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="flex items-center">
                <button className="flex items-center text-xs md:text-sm text-gray-600 hover:text-gray-900">
                  おすすめ順
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
} 