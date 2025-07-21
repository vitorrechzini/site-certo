"use client"

import * as React from "react"
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

const images = [
  { src: "https://placehold.co/600x400", alt: "Gallery image 1", hint: "woman model" },
  { src: "https://placehold.co/600x400", alt: "Gallery image 2", hint: "man model" },
  { src: "https://placehold.co/600x400", alt: "Gallery image 3", hint: "fashion style" },
  { src: "https://placehold.co/600x400", alt: "Gallery image 4", hint: "lifestyle" },
];

export default function Gallery() {
  const [api, setApi] = React.useState<CarouselApi>()
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [api])

  return (
    <section className="w-full py-8">
       <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{objectFit: "cover"}}
                  data-ai-hint={image.hint}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>
    </section>
  )
}
