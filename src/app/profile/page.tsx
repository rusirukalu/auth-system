'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/ui/Navbar';
import { GridBackground } from '@/components/landing/GridBackground';
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaSignOutAlt,
  FaTrash,
  FaIdCard,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);

  const handleLogoutConfirm = () => {
    setIsConfirmingLogout(true);
  };

  const handleLogoutCancel = () => {
    setIsConfirmingLogout(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-mono relative overflow-hidden">
        <GridBackground />
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 border-b border-white/10 pb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cyan-500 flex items-center justify-center border-2 border-white">
                <FaUser className="text-black text-3xl" />
              </div>
              <div>
                <div className="text-xs text-cyan-500 font-bold uppercase tracking-widest mb-1">
                  Citadel_Identity
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white">
                  Operative_Profile
                </h1>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-black border border-white/10 p-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs text-gray-600 font-mono">
                  ID: {user?._id || 'UNKNOWN'}
                </div>

                <div className="bg-white/5 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4 uppercase flex items-center gap-2">
                    <FaIdCard className="text-cyan-500" />
                    Personal_Information
                  </h2>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-500 mb-1 text-xs uppercase tracking-wider">
                          <FaUser className="mr-2" />
                          <label>Full_Name</label>
                        </div>
                        <div className="text-lg font-bold text-white border-b border-white/20 pb-2 font-mono">
                          {user?.name || 'LOADING...'}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-500 mb-1 text-xs uppercase tracking-wider">
                          <FaEnvelope className="mr-2" />
                          <label>Email_Address</label>
                        </div>
                        <div className="text-lg font-bold text-white border-b border-white/20 pb-2 font-mono">
                          {user?.email || 'LOADING...'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-500 mb-1 text-xs uppercase tracking-wider">
                        <FaUserShield className="mr-2" />
                        <label>Clearance_Level</label>
                      </div>
                      <div className="inline-flex items-center px-3 py-1 border border-cyan-500/50 bg-cyan-500/10 text-cyan-500 text-sm font-bold uppercase">
                        {user?.isAdmin
                          ? 'LEVEL_5_COMMANDER'
                          : 'LEVEL_1_OPERATIVE'}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                      <Button
                        variant="outline"
                        className="w-full md:w-auto border-white/20 hover:bg-white/10 text-gray-400 hover:text-white uppercase tracking-widest text-xs"
                        disabled
                      >
                        Edit_Profile [LOCKED]
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Actions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-black border border-white/10 h-full">
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 uppercase text-red-500">
                    Danger_Zone
                  </h2>

                  <div className="space-y-6">
                    {isConfirmingLogout ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 bg-red-500/5 p-4 border border-red-500/20"
                      >
                        <p className="text-sm text-red-400 font-mono">
                          [WARN] Confirm session termination?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleLogout}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-black font-bold uppercase text-xs py-3 transition-colors"
                          >
                            CONFIRM
                          </button>
                          <button
                            onClick={handleLogoutCancel}
                            className="flex-1 border border-white/10 text-white hover:bg-white/5 uppercase text-xs py-3 transition-colors"
                          >
                            CANCEL
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <Button
                        onClick={handleLogoutConfirm}
                        variant="destructive"
                        className="w-full bg-red-500/10 text-red-500 border-red-500/50 hover:bg-red-500 hover:text-white uppercase tracking-widest text-xs"
                      >
                        <FaSignOutAlt className="mr-2" />
                        TERMINATE_SESSION
                      </Button>
                    )}

                    <Button
                      disabled
                      variant="outline"
                      className="w-full border-white/10 text-gray-600 uppercase tracking-widest text-xs opacity-50 cursor-not-allowed hover:bg-transparent"
                    >
                      <FaTrash className="mr-2" />
                      DELETE_RECORD
                    </Button>

                    <div className="mt-4 p-4 bg-white/5 border border-white/10 text-[10px] text-gray-500 font-mono">
                      <p>
                        [NOTE] Account deletion requires Level 5 authorization.
                        Contact system administrator for manual purge.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
