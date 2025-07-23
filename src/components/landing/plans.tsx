
"use client";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { usePlan } from '@/context/PlanContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const plans = [
  { 
    id: 'vitalicio', 
    name: 'ACESSO VITALICIO', 
    description: 'Apenas R$1,65 por mês',
    oldPrice: 'R$99,90',
    price: '19,90',
    tag: 'MAIS VENDIDO'
  },
  { 
    id: 'mensal', 
    name: '1 MÊS DE ACESSO', 
    description: 'Apenas R$0,49 por dia',
    oldPrice: 'R$29,90',
    price: '14,90',
  },
  { 
    id: 'semanal', 
    name: '7 DIAS DE ACESSO', 
    description: 'Plano de teste sem desconto',
    oldPrice: 'R$19,90',
    price: '09,90',
  },
];

export default function Plans() {
  const { selectedPlan, setSelectedPlan } = usePlan();
  const { toast } = useToast();
  const router = useRouter();

  const handleCtaClick = () => {
    if (!selectedPlan) {
      toast({
        title: "⚠️ Selecione um Plano",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    router.push(`/checkout?plan=${selectedPlan}`);
  };

  return (
    <section className="w-full bg-background pt-4 pb-12 px-4">
      <div className="max-w-xl mx-auto">
        <div id="plans" className="space-y-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                "flex items-stretch bg-[#1C0B0B] rounded-lg cursor-pointer border-2 transition-all relative",
                selectedPlan === plan.id ? 'border-red-600' : 'border-[#2A1C1C]'
              )}
            >
              <div className="flex items-center space-x-4 flex-grow p-4">
                <div 
                    className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                        selectedPlan === plan.id ? 'border-red-600' : 'border-gray-400'
                    )}
                >
                    {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>
              </div>

              <div className="relative text-right flex flex-col justify-center bg-red-600 px-4">
                 {plan.tag && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md z-10 whitespace-nowrap">
                        {plan.tag}
                    </div>
                  )}
                <div className="text-white">
                    <p className="text-xs line-through text-red-200">{plan.oldPrice}</p>
                    <div className="flex items-baseline justify-end">
                      <span className="text-sm font-bold mr-1">R$</span>
                      <p className="text-2xl font-bold">{plan.price}</p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button 
            size="lg" 
            className={cn(
              "w-full max-w-md text-xl font-bold bg-red-600 hover:bg-red-700 text-white h-16 rounded-lg shadow-lg",
              selectedPlan && "animate-scale-pulse"
            )}
            onClick={handleCtaClick}
          >
            ASSINAR AGORA
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
