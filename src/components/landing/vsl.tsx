import Image from 'next/image';

export default function Vsl() {
  return (
    <section className="w-full bg-black flex justify-center items-center" style={{ height: '70vh', maxHeight: '600px' }}>
      <div className="w-full h-full relative">
         <Image
            src="https://placehold.co/1080x1920"
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
