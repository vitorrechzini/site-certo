import Image from 'next/image';

export default function Vsl() {
  return (
    <section className="w-full bg-background flex justify-center items-center" style={{ minHeight: '400px' }}>
      <div className="w-full h-full relative" style={{ minHeight: '400px' }}>
         <Image
            src="https://placehold.co/1200x675"
            alt="VSL Placeholder"
            fill
            style={{objectFit: 'cover'}}
            className="w-full h-full"
            data-ai-hint="video thumbnail"
          />
      </div>
    </section>
  );
}
