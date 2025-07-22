
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutFooter() {
  return (
    <footer className="w-full mt-8 bg-black text-center py-8 px-4 text-white">
        <div className="flex items-center justify-center w-full mb-4">
            <Image
                src="/logo.png"
                alt="OnlyFree Logo"
                width={150}
                height={40}
                style={{ objectFit: 'contain' }}
            />
        </div>
        <p className="text-xs text-gray-400">
            Todos os Direitos Reservados 2025 - <span className="text-blue-500">OnlyFree</span>
        </p>
    </footer>
  );
}
