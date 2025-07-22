"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface ExitIntentPopupProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function ExitIntentPopup({ isOpen, onOpenChange }: ExitIntentPopupProps) {
  const router = useRouter();

  const handleActionClick = () => {
    router.push('/checkout-promo');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black border-red-600 text-white text-center p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-red-600 font-headline">
            Espere! Você vai perder a promoção…
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white text-lg pt-4">
            Temos um presente especial pra você: Acesso por 1 dia por apenas <span className="font-bold text-xl">R$ 4,90</span>
          </AlertDialogDescription>
           <p className="text-sm text-gray-400 pt-2">
            Oferta válida somente agora. Liberamos esse preço exclusivo porque você quase saiu.
          </p>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 sm:justify-center">
            <Button
                size="lg"
                className="w-full font-bold bg-red-600 hover:bg-red-700 text-white h-14 rounded-lg shadow-[0_5px_15px_rgba(255,0,0,0.4)] text-lg"
                onClick={handleActionClick}
            >
                GARANTIR A PROMOÇÃO
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
