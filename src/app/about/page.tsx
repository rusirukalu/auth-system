'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">About This Project</h1>

          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              This authentication system is built with modern technologies to
              provide a secure, scalable, and user-friendly authentication
              experience.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Technology Stack
            </h2>
            <ul className="space-y-2 list-disc pl-6">
              <li>
                <strong>Frontend:</strong> Next.js (React framework) with App
                Router
              </li>
              <li>
                <strong>Backend:</strong> Next.js API Routes with Node.js and
                Express patterns
              </li>
              <li>
                <strong>Database:</strong> MongoDB with Mongoose ODM
              </li>
              <li>
                <strong>State Management:</strong> Redux Toolkit with RTK Query
              </li>
              <li>
                <strong>Styling:</strong> Tailwind CSS with shadcn/ui components
              </li>
              <li>
                <strong>Animations:</strong> Framer Motion
              </li>
              <li>
                <strong>Authentication:</strong> JWT tokens, HTTP-only cookies,
                bcrypt
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Security Features
            </h2>
            <ul className="space-y-2 list-disc pl-6">
              <li>
                <strong>Password Hashing:</strong> All passwords are hashed
                using bcrypt before storage
              </li>
              <li>
                <strong>HTTP-only Cookies:</strong> JWT tokens are stored in
                HTTP-only cookies to prevent XSS attacks
              </li>
              <li>
                <strong>Protected Routes:</strong> Server-side middleware
                ensures routes are properly protected
              </li>
              <li>
                <strong>Input Validation:</strong> Form inputs are validated on
                both client and server
              </li>
              <li>
                <strong>Error Handling:</strong> Comprehensive error handling
                prevents information leakage
              </li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
