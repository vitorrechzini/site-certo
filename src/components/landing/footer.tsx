"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setCurrentDate(date);
  }, []);

  return (
    <footer className="w-full mt-8">
        <div className="w-full bg-accent text-center py-2">
            <p className="font-bold text-accent-foreground text-sm">
            ATENÇÃO: Esta promoção é válida somente hoje: {currentDate}
            </p>
        </div>
        <div className="bg-black text-center py-8 px-4 text-white">
            <div className="flex items-center justify-center w-full mb-4">
               <Image
                src="/logo.png"
                alt="OnlyFree Logo"
                width={150}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-xs text-gray-400">
                Todos os Direitos Reservados 2025 - OnlyFree
            </p>
            <Link href="/remocao" className="text-xs text-gray-400 underline mt-2 inline-block">
                Política de remoção de conteúdo
            </Link>
        </div>
    </footer>
  );
}
