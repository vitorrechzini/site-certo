"use client";

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {CheckIcon} from 'lucide-react';

const plans = [
  { id: 'vitalicio', name: '👑 ACESSO VITALÍCIO', price: 'R$ 47,00', save: 'Economize R$ 250,00', features: ['Acesso a todo conteúdo', 'Atualizações diárias', 'Suporte VIP'] },
  { id: 'mensal', name: '⭐ ACESSO MENSAL', price: 'R$ 29,90', save: 'Economize R$ 119,00', features: ['Acesso a todo conteúdo', 'Atualizações diárias'] },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  return (
    <section className="w-full bg-primary py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary-foreground font-headline">ESCOLHA SEU PLANO</h2>
        <p className="text-primary-foreground/80">e tenha acesso imediato a todo o conteúdo.</p>
      </div>
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-6 max-w-md mx-auto">
        {plans.map((plan) => (
          <Label
            key={plan.id}
            htmlFor={plan.id}
            className={cn(
              "flex flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all bg-card shadow-lg",
              selectedPlan === plan.id ? 'border-primary-foreground ring-2 ring-primary-foreground' : 'border-card'
            )}
          >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <RadioGroupItem value={plan.id} id={plan.id} className="h-6 w-6 text-primary-foreground border-muted checked:bg-primary-foreground checked:text-card" />
                    <span className="ml-4 font-bold text-xl text-card-foreground">{plan.name}</span>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-card-foreground">{plan.price}</p>
                    <p className="text-sm text-green-400">{plan.save}</p>
                </div>
            </div>
            <div className="border-t border-muted my-4"></div>
            <ul className="space-y-2 text-card-foreground">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
          </Label>
        ))}
      </RadioGroup>
      <div className="flex justify-center mt-8">
        <Button size="lg" className="w-full max-w-md text-2xl font-bold bg-green-500 hover:bg-green-600 text-white h-16 rounded-xl shadow-lg">
          QUERO MEU ACESSO AGORA!
        </Button>
      </div>
    </section>
  );
}
