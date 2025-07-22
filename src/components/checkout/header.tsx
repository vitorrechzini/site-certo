
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 bg-black flex flex-col items-center shadow-lg w-full py-4">
      <div className="flex items-center justify-center w-full h-auto">
        <Link href="/">
            <Image
            src="/logo.png"
            alt="OnlyFree Logo"
            width={120}
            height={30}
            style={{ objectFit: 'contain' }}
            />
        </Link>
      </div>
    </header>
  );
}
