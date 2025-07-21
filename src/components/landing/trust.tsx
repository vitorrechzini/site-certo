import { CheckCircle2, RefreshCw, ShieldCheck, Download, Gem, Star } from 'lucide-react';

const trustItems = [
  { icon: CheckCircle2, text: 'Liberação imediata' },
  { icon: RefreshCw, text: 'Atualização diária' },
  { icon: Gem, text: 'Mais de 1.500 modelos' },
  { icon: ShieldCheck, text: 'Pagamento Seguro' },
  { icon: Download, text: 'Acesso em qualquer dispositivo' },
  { icon: Star, text: 'Conteúdo de alta qualidade' },
];

export default function Trust() {
  return (
    <section className="bg-background py-12 px-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 max-w-md mx-auto">
        {trustItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full">
               <item.icon className="h-10 w-10 text-primary" />
            </div>
            <p className="mt-2 font-semibold text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
