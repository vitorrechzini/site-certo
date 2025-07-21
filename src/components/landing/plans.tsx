"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, Star } from 'lucide-react';

const plans = [
  { 
    id: 'anual', 
    name: 'ASSINATURA ANUAL', 
    price: 'R$ 27,00',
    period: 'por mês',
    features: ['+1.500 Packs e Modelos', 'Acesso por 12 meses', 'Suporte via WhatsApp', 'Atualizações Gratuitas'],
    highlight: false,
  },
  { 
    id: 'vitalicio', 
    name: 'PLANO VITALÍCIO', 
    price: '12x de R$ 9,74',
    altPrice: 'ou R$ 97,00 à vista',
    features: ['Acesso para sempre', 'Atualizações diárias', 'Suporte VIP', 'Bônus Exclusivos'],
    highlight: true,
    tag: 'MAIS VENDIDO'
  },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState('vitalicio');

  return (
    <section className="w-full bg-primary py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary-foreground font-headline">ESCOLHA SEU PLANO</h2>
        <p className="text-primary-foreground/80">e tenha acesso imediato a todo o conteúdo.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              "bg-card text-card-foreground rounded-2xl p-6 w-full max-w-sm cursor-pointer border-2 transition-all shadow-lg relative",
              selectedPlan === plan.id ? 'border-accent ring-2 ring-accent' : 'border-transparent'
            )}
          >
            {plan.tag && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                    {plan.tag}
                </div>
            )}
            <div className="text-center">
                <h3 className="text-2xl font-bold font-headline">{plan.name}</h3>
                <p className="text-4xl font-bold mt-4">{plan.price}</p>
                <p className="text-muted-foreground">{plan.period || plan.altPrice}</p>
            </div>
            <div className="border-t border-muted my-6"></div>
            <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button size="lg" className="w-full max-w-md text-2xl font-bold bg-[#F54278] hover:bg-[#F54278]/90 text-white h-16 rounded-xl shadow-lg animate-pulse">
          QUERO MEU ACESSO AGORA!
        </Button>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm text-primary-foreground">
        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
        <span>Compra <strong>100% segura</strong> com garantia de 7 dias</span>
      </div>
    </section>
  );
}