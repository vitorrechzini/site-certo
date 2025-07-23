"use client";

import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Roboto, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
})

const fontHeading = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-heading',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        "font-body antialiased",
        fontSans.variable,
        fontHeading.variable
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
