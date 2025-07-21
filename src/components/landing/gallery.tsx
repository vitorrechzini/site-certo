"use client"

import * as React from "react"
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"

const images = [
  { src: "/foto1.jpeg", alt: "Gallery image 1", hint: "woman model" },
  { src: "/foto2.jpeg", alt: "Gallery image 2", hint: "man model" },
  { src: "/foto3.jpeg", alt: "Gallery image 3", hint: "fashion style" },
  { src: "/foto4.jpeg", alt: "Gallery image 4", hint: "lifestyle" },
  { src: "/foto5.jpeg", alt: "Gallery image 5", hint: "woman fashion" },
  { src: "/foto6.jpeg", alt: "Gallery image 6", hint: "man fashion" },
  { src: "/foto7.jpeg", alt: "Gallery image 7", hint: "glamour" },
  { src: "/foto8.jpeg", alt: "Gallery image 8", hint: "model pose" },
  { src: "/foto9.jpeg", alt: "Gallery image 9", hint: "beauty" },
  { src: "/foto10.png", alt: "Gallery image 10", hint: "luxury" },
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
    <section className="w-full py-8 px-4">
      <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{objectFit: "contain"}}
                  data-ai-hint={image.hint}
                  className="rounded-3xl"
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
