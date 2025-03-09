'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/Navbar';
import {
  FaNodeJs,
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaLinkedin,
} from 'react-icons/fa';
import {
  SiRedux,
  SiTailwindcss,
  SiFramer,
  SiJsonwebtokens,
  SiMongodb,
  SiExpress,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration errors by only rendering auth-dependent content client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#121317] text-white overflow-hidden">
      <Navbar />
      {/* Hero Section with enhanced glassmorphism and animations */}
      <motion.section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[#0d0e13] z-0"></div>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b2d42]/80 via-[#161722] to-[#0d0e13] opacity-80 z-1"></div>

          {/* Animated floating shapes */}
          <motion.div
            className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-[#ef233c] opacity-5 blur-[100px]"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-[#2b2d42] opacity-10 blur-[100px]"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[10%] w-64 h-64 rounded-full bg-[#8d99ae] opacity-5 blur-[80px]"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>

        {/* Hero content with enhanced glassmorphism */}
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#8d99ae]/90">
                Secure Authentication
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-xl text-[#edf2f4]/80 max-w-2xl mx-auto mb-12">
                  A comprehensive full-stack authentication solution with modern
                  technologies
                </p>
              </motion.div>

              {mounted && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  {isAuthenticated ? (
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#ef233c] hover:bg-[#d90429] text-white transition-all duration-500 border border-[#ef233c]/20 shadow-[0_0_20px_rgba(239,35,60,0.3)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] hover:-translate-y-1 backdrop-blur-sm rounded-xl"
                    >
                      <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        size="lg"
                        className="bg-[#ef233c] hover:bg-[#d90429] text-white transition-all duration-500 border border-[#ef233c]/20 shadow-[0_0_20px_rgba(239,35,60,0.3)] hover:shadow-[0_0_30px_rgba(239,35,60,0.5)] hover:-translate-y-1 backdrop-blur-sm rounded-xl px-8"
                      >
                        <Link href="/register">Get Started</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border border-white/10 text-white backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(237,242,244,0.1)] hover:-translate-y-1 rounded-xl px-8"
                      >
                        <Link href="/login">Login</Link>
                      </Button>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <section
        id="tech"
        className="py-24 bg-[#0d0e13] relative overflow-hidden min-h-screen"
      >
        {/* Background gradient for section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121317] to-[#0d0e13] z-0"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 z-1"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae]">
                Powered By Modern Tech Stack
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ef233c] to-[#d90429] mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              // Top row: Next.js, Tailwind CSS, Framer Motion, Redux
              {
                icon: <TbBrandNextjs className="text-4xl md:text-5xl" />,
                name: 'Next.js',
                desc: 'React framework',
              },
              {
                icon: <SiTailwindcss className="text-4xl md:text-5xl" />,
                name: 'Tailwind CSS',
                desc: 'Utility-first CSS',
              },
              {
                icon: <SiFramer className="text-4xl md:text-5xl" />,
                name: 'Framer Motion',
                desc: 'Animation library',
              },
              {
                icon: <SiRedux className="text-4xl md:text-5xl" />,
                name: 'Redux',
                desc: 'State management',
              },
              // Bottom row: MongoDB, Express, Node.js, JWT
              {
                icon: <SiMongodb className="text-4xl md:text-5xl" />,
                name: 'MongoDB',
                desc: 'NoSQL database',
              },
              {
                icon: <SiExpress className="text-4xl md:text-5xl" />,
                name: 'Express',
                desc: 'Web framework',
              },
              {
                icon: <FaNodeJs className="text-4xl md:text-5xl" />,
                name: 'Node.js',
                desc: 'Backend runtime',
              },
              {
                icon: <SiJsonwebtokens className="text-4xl md:text-5xl" />,
                name: 'JWT',
                desc: 'Authentication',
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-xl bg-[#2b2d42]/10 p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#ef233c]/30 group transition-all duration-500 flex flex-col items-center relative overflow-hidden"
                whileHover={{
                  y: -5,
                  boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.5)',
                  backgroundColor: 'rgba(43, 45, 66, 0.2)',
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ef233c]/0 via-[#ef233c]/0 to-[#ef233c]/0 rounded-2xl blur opacity-0 group-hover:opacity-100 group-hover:via-[#ef233c]/20 transition duration-1000"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="text-[#ef233c] mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:text-[#d90429]">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {tech.name}
                  </h3>
                  <p className="text-[#8d99ae] text-sm text-center">
                    {tech.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#0d0e13] text-white py-16 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13] to-[#121317] opacity-80 z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8d99ae]/20 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-8 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae]">
                  NEXT Auth
                </span>
              </div>
              <p className="text-[#8d99ae] mt-2 max-w-md">
                Secure, modern authentication system built with cutting-edge web
                technologies
              </p>
            </motion.div>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {[
                { icon: <FaGithub />, label: 'GitHub' },
                { icon: <FaTwitter />, label: 'X' },
                { icon: <FaDiscord />, label: 'Discord' },
                { icon: <FaLinkedin />, label: 'LinkedIn' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="group relative flex flex-col items-center"
                  aria-label={item.label}
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-[#8d99ae] group-hover:text-[#ef233c] group-hover:border-[#ef233c]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    {item.icon}
                  </span>
                  <span className="absolute -bottom-6 text-xs text-[#8d99ae]/0 group-hover:text-[#8d99ae] transition-all duration-300">
                    {item.label}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="border-t border-white/5 mt-12 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[#8d99ae] text-sm">
              © 2025 NEXT Auth System. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
