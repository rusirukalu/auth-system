'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/ui/Navbar';
import { GridBackground } from '@/components/landing/GridBackground';
import Link from 'next/link';
import {
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaShieldAlt,
} from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
        <GridBackground />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-24 relative z-10">
          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 border-b border-white/10 pb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-cyan-500">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Citadel_Dashboard_v1.0
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  Citadel_Command
                </h1>
                <p className="mt-2 text-gray-400 font-mono text-sm">
                  WELCOME_BACK_OPERATOR:{' '}
                  <span className="text-cyan-500">
                    {user?.name || 'UNKNOWN'}
                  </span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="text-xs text-gray-500 uppercase">
                    System_Status
                  </div>
                  <div className="text-green-500 font-bold">ONLINE</div>
                </div>
                <div className="px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="text-xs text-gray-500 uppercase">
                    Security_Level
                  </div>
                  <div className="text-cyan-500 font-bold">MAXIMUM</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-full border border-white/10 bg-black/50 backdrop-blur-sm p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <FaShieldAlt className="text-9xl text-cyan-500" />
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">
                  <span className="text-cyan-500">&gt;&gt;</span>{' '}
                  Mission_Briefing
                </h2>
                <p className="text-gray-400 max-w-2xl mb-6 font-mono text-sm leading-relaxed">
                  [INFO] Secure connection established via encrypted channel.
                  <br />
                  [INFO] User authentication verified. Access granted to
                  restricted modules.
                  <br />
                  [INFO] This dashboard serves as the central hub for your
                  application operations.
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 border border-cyan-500/30 bg-cyan-500/10">
                    <div className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-black font-bold text-xs">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="text-white font-bold text-xs uppercase">
                        Identity_Verified
                      </div>
                      <div className="text-cyan-500 text-[10px] uppercase">
                        {user?.isAdmin ? 'ADMIN_CLEARANCE' : 'STANDARD_ACCESS'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stat Cards */}
            {[
              {
                icon: FaServer,
                label: 'Server_Uptime',
                value: '99.99%',
                color: 'text-green-500',
              },
              {
                icon: FaDatabase,
                label: 'Database_Load',
                value: '12%',
                color: 'text-yellow-500',
              },
              {
                icon: FaNetworkWired,
                label: 'Active_Nodes',
                value: '42',
                color: 'text-cyan-500',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="border border-white/10 bg-white/5 p-6 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <stat.icon
                    className={`text-2xl ${stat.color} opacity-80 group-hover:opacity-100`}
                  />
                  <div className="text-xs text-gray-500 font-mono">
                    [MONITORING]
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Link
              href="/profile"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-cyan-600 font-mono uppercase tracking-widest hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
            >
              <span>Access_Profile_Settings</span>
              <div className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></div>
            </Link>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
