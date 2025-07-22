
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Copy, Check, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PixComponent() {
    const searchParams = useSearchParams();
    const price = searchParams.get('price') || '9,90';
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (timeLeft === 0) return;

        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleCopy = () => {
        // In a real app, you'd copy the actual Pix code to the clipboard
        // navigator.clipboard.writeText('pix-code-here'); 
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#0d0d0d] text-white">
        <header className="bg-black py-4 flex justify-center">
            <Image src="/logo.png" alt="OnlyFree Logo" width={120} height={30} style={{objectFit: 'contain'}} />
        </header>

        <main className="flex-grow flex flex-col items-center text-center px-4 py-8">
            <h1 className="text-3xl font-bold">Quase lá...</h1>
            <p className="mt-2 text-gray-300">
                Pague seu Pix dentro de <strong className="text-white">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</strong> para liberar seu acesso.
            </p>

            <div className="bg-[#fff5cc] text-black font-bold rounded-full py-2 px-6 mt-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Aguardando pagamento</span>
            </div>

            <div className="my-6 p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-900/50 w-full max-w-xs aspect-square flex items-center justify-center">
                <p className="text-sm text-gray-400">Erro ao gerar QR Code ou a resposta não contém a imagem.</p>
            </div>
            

            <p className="font-bold text-lg">Valor do Pix: <strong className="text-white">R${price}</strong></p>

            <button
                onClick={handleCopy}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg mt-4 flex items-center justify-center gap-2 w-full max-w-xs text-lg transition-colors"
            >
                {isCopied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                {isCopied ? 'Copiado!' : 'Copiar código Pix'}
            </button>
            
            <div className="mt-6 text-sm text-gray-400 max-w-md">
                <p>Após copiar o código, abra seu aplicativo de pagamento onde você utiliza o Pix. Escolha a opção <strong className="text-white">Pix Copia e Cola</strong> e insira o código copiado.</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-green-500 font-bold">
                    <Check className="w-5 h-5" />
                    <span>COMPRA 100% SEGURA</span>
                </div>
            </div>

             <div className="mt-8">
                <Image src="/pushinpay.png" alt="Pushin Pay Logo" width={150} height={40} data-ai-hint="logo" style={{objectFit: 'contain'}} />
             </div>

        </main>

        <footer className="text-center text-xs text-gray-500 py-6 px-4 space-y-2">
            <p>Pix processado por: <strong className="text-white font-semibold">PUSHIN PAY</strong></p>
            <p>Constará no seu extrato da sua conta bancária o nome <strong className="text-white font-semibold">PUSHIN PAY</strong>.</p>
            <p>Esta compra será processada pela PUSHIN PAY © 2025 - Todos os direitos reservados.</p>
            <p>Sua compra de acesso será processada com segurança e discrição por PUSHIN PAY. Se você encontrar algum problema durante o processo de compra, favor contatar Apoio ao Cliente.</p>
        </footer>
        </div>
    );
}

export default function GerarPixPage() {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <PixComponent />
      </Suspense>
    );
}

