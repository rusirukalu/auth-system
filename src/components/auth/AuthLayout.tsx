'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GridBackground } from '@/components/landing/GridBackground';
import { FaShieldAlt } from 'react-icons/fa';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
      <GridBackground />

      {/* Left side with illustration/brand */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 relative z-10 border-b md:border-b-0 md:border-r border-white/10 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4 text-cyan-500">
              <FaShieldAlt className="text-2xl" />
              <span className="font-bold tracking-widest">SECURE_ACCESS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">
              {title || 'AUTHENTICATE'}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 mb-12 border-l-2 border-cyan-500/50 pl-4"
          >
            <p>
              Initialize secure session.
              <br />
              Identity verification required for system access.
            </p>
          </motion.div>

          {/* Tech Visual */}
          <motion.div
            className="relative h-48 md:h-64 border border-white/10 bg-black/80 p-4 font-mono text-xs text-green-500/80 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <div className="space-y-2">
              <p className="text-white/50">// SYSTEM_LOG</p>
              <p>[INFO] Encryption protocols active</p>
              <p>[INFO] Handshake initiated...</p>
              <p>[WARN] Public access restricted</p>
              <p className="text-cyan-500 animate-pulse">
                _WAITING_FOR_CREDENTIALS
              </p>
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          </motion.div>
        </div>
      </motion.div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
