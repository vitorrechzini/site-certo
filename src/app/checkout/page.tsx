
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
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const models = [
  { src: "/Checkout1.webp", name: 'Mc Pipokinha', hint: 'woman model' },
  { src: "/Checkout2.webp", name: 'Juliana Bonde', hint: 'woman model' },
  { src: "/Checkout3.webp", name: 'Andressa Urach', hint: 'fashion style' },
  { src: "/Checkout4.webp", name: 'Kerolay Chaves', hint: 'lifestyle' },
  { src: "/Checkout5.webp", name: 'Cibelly Ferreira', hint: 'woman fashion' },
];

const FormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
});


export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan') || 'Nenhum plano selecionado';
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
    console.log("Email a ser salvo:", data.email);
    console.log("Plano selecionado:", plan);
    const planPrice = plan === 'vitalicio' ? '19.90' : (plan === 'mensal' ? '14.90' : '9.90');

    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        email: data.email,
        plan: plan,
        price: parseFloat(planPrice.replace(',', '.')),
        status: "pending",
        createdAt: serverTimestamp(),
      });
      
      console.log("Document written with ID: ", docRef.id);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando para a página de pagamento...",
        duration: 2000,
      });
      
      setTimeout(() => {
          router.push(`/gerar-pix?price=${planPrice}&transactionId=${docRef.id}`);
      }, 2000);

    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
      toast({
        title: "Erro ao salvar seus dados",
        description: "Houve um problema ao contatar o servidor. Por favor, tente novamente.",
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

        <section className="py-8 px-4 w-full">
            <div className="grid grid-cols-5 gap-2">
                {models.map((model, index) => (
                    <div key={index} className="group relative w-full aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={model.src}
                            alt={model.name}
                            fill
                            style={{objectFit: "cover"}}
                            data-ai-hint={model.hint}
                            className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 group-hover:opacity-20"></div>
                        <p className="absolute bottom-2 left-2 text-white font-bold text-xs">{model.name}</p>
                    </div>
                ))}
            </div>
        </section>

      </main>
      
      <CheckoutFooter />
    </div>
  );
}
