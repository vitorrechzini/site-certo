"use client";

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const plans = [
  { id: 'vitalicio', name: 'Acesso Vitalício', price: 'R$ 19,90', best_seller: true },
  { id: 'mensal', name: '1 Mês', price: 'R$ 14,90', best_seller: false },
  { id: 'semanal', name: '7 Dias', price: 'R$ 9,90', best_seller: false },
];

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);

  return (
    <section className="w-full bg-background py-8 px-4">
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4 max-w-md mx-auto">
        {plans.map((plan) => (
          <Label
            key={plan.id}
            htmlFor={plan.id}
            className={cn(
              "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
              selectedPlan === plan.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-muted'
            )}
          >
            <RadioGroupItem value={plan.id} id={plan.id} className="h-6 w-6" />
            <div className="ml-4 flex-grow">
              <span className="font-bold text-lg">✅ {plan.name}</span> — <span className="text-lg">{plan.price}</span>
            </div>
            {plan.best_seller && (
              <Badge variant="secondary" className="bg-green-600 text-white">MAIS VENDIDO</Badge>
            )}
          </Label>
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
