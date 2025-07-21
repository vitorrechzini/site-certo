"use client"

import * as React from "react"
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils";

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
  const autoplayInterval = React.useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DELAY = 3000;
  const PAUSE_DURATION = 8000;

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    autoplayInterval.current = setInterval(() => {
      api?.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [api]);

  const stopAutoplay = () => {
    if (autoplayInterval.current) {
      clearInterval(autoplayInterval.current);
      autoplayInterval.current = null;
    }
  };

  const handleInteraction = () => {
    stopAutoplay();
    setTimeout(startAutoplay, PAUSE_DURATION);
  };

  React.useEffect(() => {
    if (!api) {
      return
    }
 
    startAutoplay();
    api.on("select", startAutoplay); // Restart autoplay on programmatic scroll
    api.on("pointerDown", stopAutoplay); // Stop when user touches/drags
    api.on("destroy", stopAutoplay);

    return () => {
      stopAutoplay();
    };
  }, [api, startAutoplay])

  return (
    <section className="w-full py-8 px-4">
      <Carousel 
        setApi={setApi} 
        className="w-full" 
        opts={{ loop: true }}
        onNextClick={handleInteraction}
        onPrevClick={handleInteraction}
      >
        <CarouselContent className="rounded-[15px]">
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{objectFit: "contain"}}
                  data-ai-hint={image.hint}
                  className="rounded-[15px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-16" />
        <CarouselNext className="right-16" />
      </Carousel>
    </section>
  )
}
