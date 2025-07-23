
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

import CheckoutHeader from '@/components/checkout/header';
import CheckoutFooter from '@/components/checkout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Vsl from '@/components/landing/vsl';
// Firestore foi removido temporariamente para depuração
// import { db } from '@/lib/firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const FormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
});


export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan') || 'vitalicio';
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const planMap = {
      'vitalicio': '19.90',
      'mensal': '14.90',
      'semanal': '09.90'
    };
    const planPrice = planMap[plan as keyof typeof planMap] || '19.90';
    
    // Lógica do Firestore removida para teste
    try {
        // Simulando uma operação rápida e gerando um ID de transação falso
        console.log("Firestore foi pulado. Redirecionando...");
        const fakeTransactionId = `teste-${Date.now()}`;
        
        router.push(`/gerar-pix?price=${planPrice}&transactionId=${fakeTransactionId}`);

    } catch (error) {
        console.error("Erro durante o processo de checkout (sem Firestore):", error);
        toast({
            title: "Erro ao processar sua solicitação",
            description: "Houve um problema. Por favor, tente novamente.",
            variant: "destructive",
            duration: 3000,
        });
        setIsLoading(false);
    }
}

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <CheckoutHeader />

      <main className="flex-grow">
        <Vsl />

        <section className="py-8 px-4 text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Cadastro de Usuário</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-lg mx-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input 
                                    placeholder="E-mail" 
                                    {...field} 
                                    className="bg-white border-none text-black h-12 text-base px-4"
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        ) : (
                            <Check className="mr-2" />
                        )}
                        {isLoading ? 'PROCESSANDO...' : 'CADASTRAR E GERAR PIX'}
                    </Button>
                </form>
            </Form>
             <p className="text-xs text-white mt-4 max-w-lg mx-auto">
                Seu e-mail está 100% seguro, usaremos apenas para identificar seu cadastro e processar a assinatura.
            </p>
        </section>
      </main>
      
      <CheckoutFooter />
    </div>
  );
}
