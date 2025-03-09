'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/ui/Navbar';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#121317] text-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-20">
          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae]">
                  Dashboard
                </h1>
                <p className="mt-2 text-[#8d99ae]">
                  Welcome back, {user?.name || 'User'} 👋
                </p>
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-full backdrop-blur-xl bg-[#2b2d42]/10 rounded-2xl border border-white/5 shadow-xl overflow-hidden"
            >
              <div className="relative p-6">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ef233c]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2b2d42]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Welcome to Your Dashboard
                      </h2>
                      <p className="text-[#8d99ae] max-w-2xl">
                        This is a protected route that only authenticated users
                        can access. You can customize this dashboard with your
                        application features.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center space-x-2 bg-[#2b2d42]/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ef233c] to-[#d90429] flex items-center justify-center text-white font-bold text-xs">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {user?.name || 'User'}
                          </div>
                          <div className="text-[#8d99ae] text-xs">
                            {user?.isAdmin ? 'Administrator' : 'Standard User'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Link href="/profile" className="group relative overflow-hidden">
              <div className="relative z-10 flex items-center space-x-3 bg-gradient-to-r from-[#2b2d42] to-[#2b2d42]/80 hover:from-[#ef233c] hover:to-[#d90429] px-8 py-4 rounded-xl transition-all duration-500 border border-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-white font-medium">
                  View Your Profile
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </div>
            </Link>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
