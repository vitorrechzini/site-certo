import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage({ searchParams }: { searchParams: { plan?: string }}) {
  const plan = searchParams.plan || 'Nenhum plano selecionado';

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg">
            Plano selecionado: <span className="font-bold capitalize">{plan}</span>
          </p>
          <p className="text-center text-muted-foreground mt-4">
            Esta é uma página de placeholder para o checkout.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
