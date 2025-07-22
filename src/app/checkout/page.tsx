
"use client";

import { useSearchParams } from 'next/navigation';
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";


const models = [
  { src: '/foto1.jpeg', name: 'Emily', hint: 'woman model' },
  { src: '/foto2.jpeg', name: 'Jessica', hint: 'man model' },
  { src: '/foto3.jpeg', name: 'Sophia', hint: 'fashion style' },
  { src: '/foto4.jpeg', name: 'Laura', hint: 'lifestyle' },
  { src: '/foto5.jpeg', name: 'Chloe', hint: 'woman fashion' },
];

const FormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
});


export default function CheckoutPage() {
  const searchParams = useSearchParams();
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
      title: "Cadastro em andamento...",
      description: "Redirecionando para a página de pagamento.",
      variant: "default",
      duration: 3000,
    });
    // Aqui viria a lógica para salvar no Firebase e redirecionar
    // router.push('/gerar-pix');
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <CheckoutHeader />

      <main className="flex-grow">
        <section className="w-full bg-black flex justify-center items-center">
            <div className="w-full aspect-video relative max-h-[50vh]">
                <Image
                src="https://placehold.co/1080x1920"
                alt="VSL Placeholder"
                fill
                style={{objectFit: 'contain'}}
                className="w-full h-full"
                data-ai-hint="video thumbnail"
                />
            </div>
        </section>

        <section className="py-8 px-4 text-white text-center">
            <h2 className="text-2xl font-bold mb-6">Cadastro de Usuário</h2>
            <FormProvider {...form}>
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
                                    className="bg-gray-800 border-gray-700 text-white h-12 text-center text-base"
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14">
                        <Check className="mr-2" /> CADASTRAR E GERAR PIX
                    </Button>
                </form>
            </FormProvider>
             <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
                Seu e-mail está 100% seguro, usaremos apenas para identificar seu cadastro e processar a assinatura.
            </p>
        </section>

        <section className="py-8">
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
                >
                <CarouselContent className="-ml-2">
                    {models.map((model, index) => (
                    <CarouselItem key={index} className="basis-1/3 pl-2">
                        <div className="flex flex-col items-center text-center">
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
                            <p className="mt-2 text-white font-bold">{model.name}</p>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>

      </main>
      
      <CheckoutFooter />
    </div>
  );
}
