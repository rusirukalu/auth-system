'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/ui/Navbar';
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaSignOutAlt,
  FaTrash,
} from 'react-icons/fa';

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
      <div className="min-h-screen flex flex-col bg-[#121317] text-white">
        <Navbar />
        {/* Decorative Backgrounds */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-40 left-[10%] w-72 h-72 rounded-full bg-[#ef233c] opacity-5 blur-[100px]"></div>
          <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-[#2b2d42] opacity-10 blur-[100px]"></div>
        </div>

        <main className="flex-grow container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef233c] to-[#d90429] flex items-center justify-center mr-4 shadow-lg shadow-[#ef233c]/20">
                <FaUser className="text-white text-xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae]">
                Your Profile
              </h1>
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
              <div className="backdrop-blur-xl bg-[#2b2d42]/10 rounded-2xl border border-white/5 shadow-xl overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ef233c]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2b2d42]/20 rounded-full blur-3xl"></div>

                <div className="relative p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                    Profile Information
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-[#8d99ae] mb-1">
                        <FaUser className="mr-2" />
                        <label className="text-sm font-medium">Name</label>
                      </div>
                      <div className="text-lg font-semibold bg-[#1a1c25] rounded-xl p-4 border border-white/5">
                        {user?.name || 'Loading...'}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-[#8d99ae] mb-1">
                        <FaEnvelope className="mr-2" />
                        <label className="text-sm font-medium">Email</label>
                      </div>
                      <div className="text-lg font-semibold bg-[#1a1c25] rounded-xl p-4 border border-white/5">
                        {user?.email || 'Loading...'}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-[#8d99ae] mb-1">
                        <FaUserShield className="mr-2" />
                        <label className="text-sm font-medium">
                          Account Type
                        </label>
                      </div>
                      <div className="text-lg font-semibold bg-[#1a1c25] rounded-xl p-4 border border-white/5">
                        {user?.isAdmin ? 'Administrator' : 'Standard User'}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="w-full bg-[#2b2d42]/40 text-[#8d99ae] border border-white/10 rounded-xl py-3 backdrop-blur-md transition-all duration-300 hover:bg-[#2b2d42]/60 cursor-not-allowed">
                        Edit Profile (Coming Soon)
                      </button>
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
              <div className="backdrop-blur-xl bg-[#2b2d42]/10 rounded-2xl border border-white/5 shadow-xl overflow-hidden h-full">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                    Account Actions
                  </h2>

                  <div className="space-y-6">
                    {isConfirmingLogout ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 bg-[#1a1c25] p-4 rounded-xl border border-[#ef233c]/20"
                      >
                        <p className="text-sm text-[#8d99ae]">
                          Are you sure you want to logout?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleLogout}
                            className="flex-1 bg-gradient-to-r from-[#ef233c] to-[#d90429] hover:from-[#d90429] hover:to-[#ef233c] text-white transition-all duration-500 py-2 rounded-xl hover:shadow-lg hover:shadow-[#ef233c]/20 transform hover:-translate-y-1"
                          >
                            <div className="flex items-center justify-center">
                              <FaSignOutAlt className="mr-2" />
                              Yes, Logout
                            </div>
                          </button>
                          <button
                            onClick={handleLogoutCancel}
                            className="flex-1 border border-white/10 text-white hover:bg-white/5 backdrop-blur-md transition-all duration-300 py-2 rounded-xl"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        onClick={handleLogoutConfirm}
                        className="w-full border border-white/10 text-white hover:bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 rounded-xl py-3 flex items-center justify-center"
                      >
                        <FaSignOutAlt className="mr-2" />
                        <span>Logout</span>
                      </button>
                    )}

                    <button
                      disabled
                      className="w-full border border-white/10 text-[#8d99ae] bg-white/5 backdrop-blur-md rounded-xl py-3 flex items-center justify-center opacity-60"
                    >
                      <FaTrash className="mr-2" />
                      <span>Delete Account</span>
                    </button>

                    <div className="mt-2 p-4 bg-[#ef233c]/10 border border-[#ef233c]/20 rounded-xl">
                      <p className="text-sm text-[#ef233c] flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          Account deletion functionality will be implemented in
                          a future update.
                        </span>
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
