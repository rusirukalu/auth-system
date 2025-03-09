'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with illustration/brand */}
      <motion.div
        className="w-full md:w-1/2 bg-primary-dark flex flex-col justify-center p-8 md:p-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {title || 'Welcome Back!'}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-secondary mb-8"
          >
            <p>
              Secure authentication system with the latest technologies for your
              web applications.
            </p>
          </motion.div>

          {/* Add a placeholder for an illustration */}
          <motion.div
            className="relative h-40 md:h-64 rounded-lg overflow-hidden bg-background/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-white/40 text-center p-4">
              <p>
                Authentication Illustration Placeholder
                <br />
                (Replace with your own image)
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
