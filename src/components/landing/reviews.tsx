
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf } from 'lucide-react';

const reviews = [
  { name: 'Pedro Souza', image: '/__tmp__/image.jpeg', rating: 5, comment: 'meu deus, é um vídeo melhor que o outro', hint: 'man portrait'},
  { name: 'Carlos Álvez', image: '', rating: 5, comment: 'se é loco, nunca mais Xvideos..', hint: 'man portrait'},
  { name: 'Lucas Rodrigues', image: '', rating: 4, comment: 'Essa melody é muito safada pqp, melhor grupo que ja entrei', hint: 'man smiling'},
  { name: 'Marcos Ferreira', image: '', rating: 5, comment: 'Muito barato pela qualidade que entrega, chegou muito rápido e as mina são top!', hint: 'man glasses'},
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        if (ratingValue <= rating) {
          return <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />;
        }
        if (ratingValue - 0.5 === rating) {
          return <StarHalf key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />;
        }
        return <Star key={i} className="h-5 w-5 text-gray-300" />;
      })}
    </div>
  );

export default function Reviews() {
  return (
    <section className="bg-black py-12 px-4">
      <div className="text-center mb-8 text-white">
        <h3 className="text-3xl font-bold font-headline">Avaliações (487)</h3>
        <div className="flex items-center justify-center mt-2">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-muted-foreground ml-2">/ 5.0</span>
        </div>
      </div>
      <div className="space-y-6 max-w-md mx-auto">
        {reviews.map((review, index) => (
          <Card key={index} className="bg-[#1a1a1a] border-[#2a2a2a]">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={review.image} alt={review.name} data-ai-hint={review.hint} />
                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                 <p className="font-bold text-white">{review.name}</p>
                 <StarRating rating={review.rating} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 italic">"{review.comment}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
