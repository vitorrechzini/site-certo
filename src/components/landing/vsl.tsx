import Image from 'next/image';

export default function Vsl() {
  return (
    <section className="w-full bg-black flex justify-center items-center">
      <div className="w-full aspect-video relative" style={{ maxHeight: '320px' }}>
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
