'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { FaTerminal } from 'react-icons/fa';

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const { isAuthenticated, user, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Ensure client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
  };

  // Handle smooth scrolling for anchor links
  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    if (isAuthPage && href === '#hero') {
      // Don't prevent default, let it navigate to '/'
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      closeMobileMenu(); // Close mobile menu after clicking
    }
  };

  const publicLinks = [
    { href: isAuthPage ? '/' : '#hero', label: 'HOME' },
    ...(isAuthPage ? [] : [{ href: '#tech', label: 'SYSTEM_MODULES' }]),
  ];

  const authLinks = [
    { href: '/dashboard', label: 'DASHBOARD' },
    { href: '/profile', label: 'PROFILE' },
  ];

  const navLinks = mounted ? (isAuthenticated ? authLinks : publicLinks) : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-black flex items-center group tracking-tighter"
          >
            <span className="text-white group-hover:text-cyan-500 transition-colors duration-300">
              PROJECT
              <span className="text-cyan-500 group-hover:text-white">
                _CITADEL
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {mounted &&
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                >
                  <span
                    className={`text-sm font-bold transition-colors duration-300 group-hover:text-cyan-500 ${
                      pathname === link.href ? 'text-cyan-500' : 'text-white/70'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}
                  />
                </Link>
              ))}

            {mounted && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5">
                      <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                      <span className="text-xs font-mono text-gray-400">
                        {user?.name || 'USER_ID'}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="h-9 px-4 text-xs border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      {loading ? 'TERMINATING...' : 'LOGOUT'}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/login"
                      className="text-sm font-bold text-white/70 hover:text-cyan-500 transition-colors"
                    >
                      LOGIN
                    </Link>
                    <Button
                      asChild
                      className="h-10 px-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
                    >
                      <Link href="/register">
                        <FaTerminal className="mr-2" /> INITIALIZE
                      </Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 border border-white/10 bg-white/5"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mounted && (
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 border-t border-white/10 pt-4"
              >
                <div className="flex flex-col space-y-2">
                  {publicLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`py-3 px-4 border border-white/5 bg-white/5 hover:border-cyan-500/50 transition-colors ${
                        pathname === link.href
                          ? 'text-cyan-500 border-cyan-500/50'
                          : 'text-white'
                      }`}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                    >
                      <span className="font-mono text-sm">{link.label}</span>
                    </Link>
                  ))}

                  {isAuthenticated && (
                    <>
                      {authLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`py-3 px-4 border border-white/5 bg-white/5 hover:border-cyan-500/50 transition-colors ${
                            pathname === link.href
                              ? 'text-cyan-500 border-cyan-500/50'
                              : 'text-white'
                          }`}
                          onClick={closeMobileMenu}
                        >
                          <span className="font-mono text-sm">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                      <button
                        className="w-full text-left mt-2 px-4 py-3 text-red-500 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors font-mono text-sm"
                        onClick={handleLogout}
                        disabled={loading}
                      >
                        {loading ? 'TERMINATING...' : 'LOGOUT'}
                      </button>
                    </>
                  )}

                  {!isAuthenticated && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <Link
                        href="/login"
                        className="text-center py-3 border border-white/10 hover:bg-white/5 text-white font-bold text-sm"
                        onClick={closeMobileMenu}
                      >
                        LOGIN
                      </Link>
                      <Link
                        href="/register"
                        className="text-center py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm"
                        onClick={closeMobileMenu}
                      >
                        REGISTER
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
