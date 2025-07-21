"use client";

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  { id: 'vitalicio', name: 'ACESSO VITALICIO', description: 'Apenas R$1,65 por mês', price: '19,90', oldPrice: 'R$99,90', best_seller: true },
  { id: 'mensal', name: '1 MÊS DE ACESSO', description: 'Apenas R$0,49 por dia', price: '14,90', oldPrice: 'R$29,90', best_seller: false },
  { id: 'semanal', name: '7 DIAS DE ACESSO', description: 'Plano de teste sem desconto', price: '09,90', oldPrice: 'R$19,90', best_seller: false },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  return (
    <section className="w-full bg-background py-8 px-4">
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4 max-w-md mx-auto">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
             {plan.best_seller && (
              <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md z-10">
                MAIS VENDIDO
              </div>
            )}
            <Label
              htmlFor={plan.id}
              className={cn(
                "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all bg-card",
                selectedPlan === plan.id ? 'border-primary' : 'border-primary/50'
              )}
            >
              <RadioGroupItem value={plan.id} id={plan.id} className="h-6 w-6 text-primary border-primary" />
              <div className="ml-4 flex-grow">
                <span className="font-bold text-lg text-white">{plan.name}</span>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary text-primary-foreground p-3 rounded-md ml-4 w-28 text-center">
                <span className="text-xs line-through text-primary-foreground/70">{plan.oldPrice}</span>
                <div className="text-3xl font-bold">
                  <span className="text-sm align-top">R$</span>{plan.price}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-center mt-8">
        <Button size="lg" className="w-full max-w-md text-xl font-bold bg-primary hover:bg-primary/90">
          ASSINAR AGORA →
        </Button>
      </div>
    </section>
  );
}
