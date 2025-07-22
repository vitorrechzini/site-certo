
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black flex flex-col items-center shadow-lg w-full">
      <div className="flex items-center justify-center w-full h-20">
        <Link href="/">
            <Image
            src="/logo.png"
            alt="OnlyFree Logo"
            width={150}
            height={40}
            style={{ objectFit: 'contain' }}
            />
        </Link>
      </div>
    </header>
  );
}
