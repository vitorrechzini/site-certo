import Image from 'next/image';

export default function Vsl() {
  return (
    <section className="w-full bg-black flex justify-center items-center">
      <div className="w-full aspect-video relative max-h-[50vh]">
         <Image
            src="https://placehold.co/1080x1920"
            alt="VSL Placeholder"
            fill
            style={{objectFit: 'contain'}}
            className="w-full h-full rounded-lg"
            data-ai-hint="video thumbnail"
          />
      </div>
    </section>
  );
}
