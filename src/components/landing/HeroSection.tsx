'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FaTerminal } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { SecurityTicker } from './SecurityTicker';

export const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen flex flex-col justify-center pt-20 border-b border-white/10"
    >
      <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Typography */}
        <motion.div
          style={{ opacity, y }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-cyan-500" />
            <span className="text-cyan-500 tracking-widest text-sm font-bold">
              SYSTEM_STATUS: ONLINE
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
            PROJECT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              CITADEL
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 border-l-2 border-cyan-500/50 pl-6">
            Next-generation identity management infrastructure.
            <br />
            Built for absolute security in a zero-trust world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {mounted && isAuthenticated ? (
              <Button
                asChild
                className="h-14 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-none border border-cyan-400 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <Link href="/dashboard">
                  <FaTerminal className="mr-2" /> ENTER_DASHBOARD
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  className="h-14 px-8 bg-white hover:bg-gray-200 text-black font-bold rounded-none border border-gray-400 shadow-[4px_4px_0px_0px_rgba(0,255,255,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  <Link href="/register">INITIALIZE_ACCESS</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 bg-transparent hover:bg-white/5 text-cyan-500 border border-cyan-500/50 rounded-none font-bold hover:text-cyan-400 transition-all"
                >
                  <Link href="/login">SECURE_LOGIN</Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Column: Technical Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:col-span-4 hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full aspect-[3/4] border border-white/10 bg-black/50 backdrop-blur-sm p-6 flex flex-col font-mono text-xs text-green-500/80 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500" />
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500" />

            <div className="mb-4 text-white/50 border-b border-white/10 pb-2">
              // SECURITY_LOG_STREAM
            </div>
            <div className="space-y-2 font-mono">
              <p>[INFO] Initializing handshake...</p>
              <p>[INFO] Verifying integrity...</p>
              <p className="text-cyan-500">[OK] Connection established</p>
              <p>[INFO] Loading modules:</p>
              <ul className="pl-4 list-disc text-gray-500">
                <li>Auth.Core v2.1</li>
                <li>Crypto.Engine v4.0</li>
                <li>Shield.Net v1.2</li>
              </ul>
              <div className="mt-8 p-4 border border-green-500/20 bg-green-500/5">
                <p className="text-white">STATUS: PROTECTED</p>
                <div className="w-full h-1 bg-gray-800 mt-2">
                  <div className="w-[98%] h-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <SecurityTicker />
    </section>
  );
};
