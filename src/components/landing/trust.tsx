import { Unlock, ShieldCheck, Smartphone, Calendar, Flame, UserCheck, Headphones, PlayCircle, User } from 'lucide-react';

const trustItems = [
  { icon: Unlock, text: <>Liberação de<br/>acesso imediata</> },
  { icon: ShieldCheck, text: <>100% Seguro e<br/>livre de vírus</> },
  { icon: Smartphone, text: <>Compatível com<br/>smartphone</> },
  { icon: Calendar, text: 'Atualização diária' },
  { icon: Flame, text: 'Conteúdo exclusivo' },
  { icon: UserCheck, text: <>Sigilo absoluto na<br/>hora da compra</> },
  { icon: Headphones, text: 'Suporte 24Hrs' },
  { icon: PlayCircle, text: <>Mais de 100.000<br/>conteúdos exclusivos</> },
  { icon: User, text: <>Mais de 1.500<br/>modelos diferentes</> },
];

export default function Trust() {
  return (
    <section className="bg-background text-white py-12 px-4">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8 max-w-md mx-auto">
        {trustItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <item.icon className="h-10 w-10 text-red-600 mb-2" />
            <p className="font-semibold text-sm leading-tight">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
