"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const faqItems = [
    {
        question: 'Minha privacidade e segurança estão garantidas?',
        answer: 'Sim, 100% garantidas. Usamos as melhores plataformas de pagamento do mercado e protocolos de segurança de ponta para garantir a total privacidade e segurança dos seus dados.'
    },
    {
        question: 'O conteúdo vale a pena?',
        answer: 'Com certeza! Oferecemos mais de 1.500 modelos com atualizações diárias. O acesso vitalício garante que você sempre terá o melhor conteúdo pelo menor preço.'
    },
    {
        question: 'O preço é justo?',
        answer: 'Absolutamente. Nossos preços são os mais competitivos do mercado, especialmente o plano vitalício, que oferece um valor incrível a longo prazo.'
    },
    {
        question: 'É fácil de usar?',
        answer: 'Sim, nossa plataforma é extremamente intuitiva e fácil de navegar. O acesso é liberado imediatamente após o pagamento, sem complicações.'
    },
    {
        question: 'Posso assistir em todos os meus dispositivos?',
        answer: 'Sim! Você pode acessar nosso conteúdo em qualquer dispositivo, seja celular, tablet ou computador, a qualquer hora e em qualquer lugar.'
    },
    {
        question: 'Como é o suporte ao cliente?',
        answer: 'Nosso suporte está disponível para ajudar com qualquer dúvida ou problema que você possa ter. O acesso é liberado imediatamente após o pagamento, então raramente você precisará de ajuda.'
    },
    {
        question: 'Tenho que assinar por um longo prazo?',
        answer: 'Não! Temos planos flexíveis, incluindo um plano de 7 dias. Mas a nossa melhor oferta é o acesso vitalício, onde você paga uma única vez e aproveita para sempre.'
    },
    {
        question: 'Por que escolher vocês e não outro site?',
        answer: 'Oferecemos o melhor custo-benefício, com conteúdo de alta qualidade, atualizações constantes, segurança robusta e uma plataforma fácil de usar. Nossa oferta vitalícia é incomparável.'
    }
];

export default function Faq() {

  const handleCtaClick = () => {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-background py-12">
      <div className="w-full px-4">
        <h3 className="text-3xl font-bold text-center mb-8 font-headline text-white">Perguntas Frequentes</h3>
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
             <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-700">
                <AccordionTrigger className="text-left font-semibold text-white hover:no-underline py-4 text-base justify-start">
                  <div className="flex items-center">
                    <span className="text-red-600 mr-2 text-xl leading-none">&#9654;</span>
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4 pl-8">
                  {item.answer}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex justify-center mt-8">
            <Button 
              size="lg" 
              className={cn(
                "w-full max-w-md text-xl font-bold bg-red-600 hover:bg-red-700 text-white h-14 rounded-lg shadow-lg"
              )}
              onClick={handleCtaClick}
            >
                Escolher Plano
            </Button>
        </div>
      </div>
    </section>
  )
}
