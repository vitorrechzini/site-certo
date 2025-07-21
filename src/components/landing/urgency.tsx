import { Progress } from "@/components/ui/progress";

export default function Urgency() {
  return (
    <section className="w-full bg-background text-primary-foreground text-center py-8 px-4 my-8">
      <h3 className="text-3xl font-bold font-headline">Vagas Preenchidas: 97%</h3>
      <Progress value={97} className="w-4/5 max-w-md mx-auto mt-4 h-4 bg-primary-foreground/30" indicatorClassName="bg-primary"/>
      <p className="mt-4 text-lg">Confira o feedback dos nossos clientes</p>
    </section>
  );
}
