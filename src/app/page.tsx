"use client";

import Header from '@/components/landing/header';
import Vsl from '@/components/landing/vsl';
import Cta from '@/components/landing/cta';
import Plans from '@/components/landing/plans';
import Gallery from '@/components/landing/gallery';
import Trust from '@/components/landing/trust';
import Urgency from '@/components/landing/urgency';
import Reviews from '@/components/landing/reviews';
import Faq from '@/components/landing/faq';
import Footer from '@/components/landing/footer';
import { PlanProvider } from '@/context/PlanContext';

export default function Home() {

  return (
    <PlanProvider>
      <div className="flex flex-col items-center bg-background min-h-screen">
        <Header />
        <main className="w-full mt-[120px]">
          <Vsl />
          <Cta />
          <Plans />
          <Gallery />
          <Trust />
          <Urgency />
          <Reviews />
          <Faq />
        </main>
        <Footer />
      </div>
    </PlanProvider>
  );
}
