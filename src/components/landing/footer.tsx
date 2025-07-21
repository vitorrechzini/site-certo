import { Eye } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-8">
        <div className="w-full bg-accent text-center py-2">
            <p className="font-bold text-accent-foreground text-sm">
            ATENÇÃO: Esta promoção é válida somente hoje!
            </p>
        </div>
        <div className="bg-background text-center py-8 px-4 text-white">
            <div className="flex items-center justify-center w-full mb-4">
                <Eye className="text-white h-6 w-6 mr-2" />
                <h1 className="text-2xl font-bold font-headline">OnlyFree</h1>
            </div>
            <p className="text-xs text-gray-400">
                Todos os Direitos Reservados 2025 - OnlyFree
            </p>
            <a href="#" className="text-xs text-gray-400 underline mt-2 inline-block">
                Política de remoção de conteúdo
            </a>
        </div>
    </footer>
  );
}
