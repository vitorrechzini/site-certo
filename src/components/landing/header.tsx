import { Eye } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background flex flex-col items-center shadow-lg w-full">
      <div className="flex items-center justify-center w-full h-20">
        <Eye className="text-white h-8 w-8 mr-2" />
        <h1 className="text-3xl font-bold text-white font-headline">OnlyFree</h1>
      </div>
      <div className="w-full bg-accent text-center py-2 flex items-center justify-center h-10">
        <p className="font-bold text-accent-foreground text-sm">
          ATENÇÃO: Esta promoção é válida somente hoje!
        </p>
      </div>
    </header>
  );
}
