import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        question: 'O conteúdo vale a pena?',
        answer: 'Com certeza! Oferecemos mais de 1.500 modelos com atualizações diárias. O acesso vitalício garante que você sempre terá o melhor conteúdo pelo menor preço.'
    },
    {
        question: 'É seguro?',
        answer: 'Sim, 100% seguro. Usamos as melhores plataformas de pagamento do mercado para garantir a segurança dos seus dados e do seu acesso.'
    },
    {
        question: 'O suporte é bom?',
        answer: 'Nosso suporte está disponível para ajudar com qualquer dúvida ou problema que você possa ter. O acesso é liberado imediatamente após o pagamento, então raramente você precisará de ajuda.'
    },
    {
        question: 'Tenho que assinar por muito tempo?',
        answer: 'Não! Temos planos flexíveis, incluindo um plano de 7 dias. Mas a nossa melhor oferta é o acesso vitalício, onde você paga uma única vez e aproveita para sempre.'
    }
];


export default function Faq() {
  return (
    <section className="w-full bg-background py-12 px-4">
      <div className="max-w-md mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8 font-headline">Perguntas Frequentes</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
             <AccordionItem value={`item-${index}`} key={index} className="bg-card border-muted rounded-lg mb-2 px-4">
                <AccordionTrigger className="text-left font-bold hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                {item.answer}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
