'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
          READY_TO_DEPLOY?
        </h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          Initialize your secure environment today. Full access to all modules
          included.
        </p>
        <div className="inline-flex flex-col items-center">
          <Button
            asChild
            size="lg"
            className="h-20 px-16 text-2xl bg-white text-black hover:bg-cyan-500 hover:text-black font-black rounded-none transition-all duration-300"
          >
            <Link href="/register">START_ENGINE</Link>
          </Button>
          <div className="mt-4 text-xs text-gray-600 font-mono">
            NO CREDIT CARD REQUIRED FOR DEV MODE
          </div>
        </div>
      </div>
    </section>
  );
};
