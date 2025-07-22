
"use client";

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { Copy, Check, Clock, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { generatePix, GeneratePixOutput } from '@/ai/flows/generate-pix-flow';

function PixComponent() {
    const searchParams = useSearchParams();
    const price = searchParams.get('price') || '19.90';
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
    const [isCopied, setIsCopied] = useState(false);
    const [pixData, setPixData] = useState<GeneratePixOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPixData() {
            setIsLoading(true);
            setError(null);
            try {
                const numericPrice = parseFloat(price.replace(',', '.'));
                let description = 'Acesso Vitalício';
                if (numericPrice === 14.90) description = 'Plano Mensal';
                if (numericPrice === 9.90) description = 'Plano Semanal';

                const data = await generatePix({ value: numericPrice, description });
                setPixData(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Erro ao gerar o QR Code. Tente novamente.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchPixData();
    }, [price]);

    useEffect(() => {
        if (timeLeft === 0 || !isLoading) return;

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, isLoading]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleCopy = () => {
        if (!pixData?.qr_code_text) return;
        navigator.clipboard.writeText(pixData.qr_code_text);
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
                {timeLeft > 0 ? (
                    <>
                    Pague seu Pix dentro de <strong className="text-white">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</strong> para liberar seu acesso.
                    </>
                ) : (
                    <span className="text-red-500 font-bold">O tempo para pagamento expirou!</span>
                )}
            </p>

            <div className="bg-[#facc15] text-black font-bold rounded-full py-2 px-6 mt-6 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Aguardando pagamento</span>
            </div>

            <div className="my-6 p-1 border-2 border-dashed border-gray-600 rounded-lg bg-gray-900/50 w-full max-w-xs aspect-square flex items-center justify-center">
                 {isLoading ? (
                    <div className="flex flex-col items-center gap-2 text-white">
                        <Loader2 className="w-12 h-12 animate-spin" />
                        <span>Gerando seu PIX...</span>
                    </div>
                ) : error ? (
                    <p className="text-sm text-red-400 p-4">{error}</p>
                ) : pixData?.qr_code_image ? (
                    <Image 
                        src={pixData.qr_code_image} 
                        alt="QR Code PIX" 
                        width={300} 
                        height={300}
                        className="rounded-lg" 
                    />
                ) : (
                    <p className="text-sm text-gray-400">Não foi possível exibir o QR Code.</p>
                )}
            </div>

            <p className="font-bold text-lg">Valor do Pix: <strong className="text-white">R${price}</strong></p>

            <button
                onClick={handleCopy}
                disabled={!pixData || isLoading || !!error}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg mt-4 flex items-center justify-center gap-2 w-full max-w-xs text-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
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
            <p>
                Esta compra será processada pela PUSHIN PAY © 2025 - Todos os direitos reservados. 
                Sua compra de acesso será processada com segurança e discrição por PUSHIN PAY. 
                Se você encontrar algum problema durante o processo de compra, favor contatar Apoio ao Cliente.
            </p>
        </footer>
        </div>
    );
}

export default function GerarPixPage() {
    return (
      <Suspense fallback={<div className="bg-black text-white flex items-center justify-center min-h-screen">Carregando...</div>}>
        <PixComponent />
      </Suspense>
    );
}
