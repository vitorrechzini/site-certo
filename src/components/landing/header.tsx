"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background flex flex-col items-center shadow-lg w-full">
      <div className="flex items-center justify-center w-full h-20">
        <Image
          src="/logo.png"
          alt="OnlyFree Logo"
          width={150}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="w-full bg-accent text-center py-2 flex items-center justify-center h-10">
        <p className="font-bold text-accent-foreground text-sm">
          ATENÇÃO: Esta promoção é válida somente hoje: {currentDate}
        </p>
      </div>
    </header>
  );
}
