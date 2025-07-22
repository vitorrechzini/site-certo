import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CheckoutPromoPage() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Checkout - Oferta Especial</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Plano selecionado: <span className="font-bold">Acesso por 1 dia</span>
          </p>
          <p className="text-4xl font-bold text-primary my-4">
            R$ 4,90
          </p>
          <p className="text-muted-foreground mt-4">
            Esta é uma página de placeholder para o checkout da promoção.
          </p>
           <Button asChild size="lg" className="mt-6 w-full font-bold text-lg">
            <Link href="/checkout?plan=promocional">Finalizar Compra <ArrowRight className="ml-2"/></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
