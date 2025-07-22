
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { Check } from 'lucide-react';

import CheckoutHeader from '@/components/checkout/header';
import CheckoutFooter from '@/components/checkout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';


const models = [
  { src: "/Checkout1.webp", name: 'Kinechan', hint: 'woman model' },
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Email a ser salvo:", data.email);
    console.log("Plano selecionado:", plan);
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Redirecionando para a página de pagamento...",
      duration: 2000,
    });
    
    setTimeout(() => {
        const planPrice = plan === 'vitalicio' ? '19.90' : (plan === 'mensal' ? '14.90' : '9.90');
        router.push(`/gerar-pix?price=${planPrice}`);
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <CheckoutHeader />

      <main className="flex-grow">
        <section className="w-full bg-black flex justify-center items-center">
            <div className="w-full aspect-video relative max-h-[300px]">
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg bg-black">
                    VSL Vídeo Aqui (embed ou imagem)
                </div>
            </div>
        </section>

        <section className="py-8 px-4 text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Cadastro de Usuário</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input 
                                    placeholder="E-mail" 
                                    {...field} 
                                    className="bg-white border-none text-black h-12 text-center text-base"
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full max-w-md bg-green-500 hover:bg-green-600 text-white font-bold text-lg h-14">
                        <Check className="mr-2" /> CADASTRAR E GERAR PIX
                    </Button>
                </form>
            </Form>
             <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
                Seu e-mail está 100% seguro, usaremos apenas para identificar seu cadastro e processar a assinatura.
            </p>
        </section>

        <section className="py-8 px-4 w-full">
            <div className="grid grid-cols-5 gap-2">
                {models.map((model, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                            <Image
                                src={model.src}
                                alt={model.name}
                                fill
                                style={{objectFit: "cover"}}
                                data-ai-hint={model.hint}
                                className="rounded-lg"
                            />
                        </div>
                        <p className="mt-2 text-white font-bold text-xs">{model.name}</p>
                    </div>
                ))}
            </div>
        </section>

      </main>
      
      <CheckoutFooter />
    </div>
  );
}
