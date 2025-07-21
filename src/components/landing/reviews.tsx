import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Ana P.', image: 'https://placehold.co/100x100', rating: 5, comment: 'Incrível! Conteúdo de qualidade e acesso super rápido. Recomendo demais!', hint: 'woman portrait'},
  { name: 'Carlos S.', image: 'https://placehold.co/100x100', rating: 5, comment: 'A melhor plataforma que já assinei. As atualizações são constantes e valem cada centavo.', hint: 'man portrait'},
  { name: 'Juliana M.', image: 'https://placehold.co/100x100', rating: 4, comment: 'Muito bom, bastante variedade. O preço vitalício é imbatível.', hint: 'woman smiling'},
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <section className="bg-background py-12 px-4">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold font-headline">O que nossos clientes dizem</h3>
        <div className="flex items-center justify-center mt-2">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-muted-foreground ml-2">/ 5.0</span>
        </div>
      </div>
      <div className="space-y-6 max-w-md mx-auto">
        {reviews.map((review, index) => (
          <Card key={index} className="bg-card border-muted">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={review.image} alt={review.name} data-ai-hint={review.hint} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                 <p className="font-bold">{review.name}</p>
                 <StarRating rating={review.rating} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">"{review.comment}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
