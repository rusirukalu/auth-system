'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

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
  const handleSmoothScroll = (e, href) => {
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
    { href: isAuthPage ? '/' : '#hero', label: 'Home' },
    ...(isAuthPage ? [] : [{ href: '#tech', label: 'Tech Stack' }]),
  ];

  const authLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ];

  const navLinks = mounted ? (isAuthenticated ? authLinks : publicLinks) : [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0d0e13]/60 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae] group-hover:from-white group-hover:to-white transition-all duration-300">
              NEXT Auth
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
                    className={`text-sm font-medium transition-colors duration-300 group-hover:text-[#ef233c] ${
                      pathname === link.href
                        ? 'text-[#ef233c]'
                        : 'text-white/90'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}

            {mounted && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {' '}
                    {/* Removed ml-4 */}
                    <span className="text-sm text-[#8d99ae]">
                      {user?.name || 'User'}
                    </span>
                    <Button
                      variant="outline"
                      className="text-white border-white/10 hover:border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
                      size="sm"
                      onClick={handleLogout}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Logging out...
                        </span>
                      ) : (
                        'Logout'
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    {' '}
                    {/* Removed ml-4 */}
                    <Button
                      asChild
                      variant="ghost"
                      className="text-white hover:text-[#ef233c] hover:bg-transparent transition-colors duration-300"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button
                      asChild
                      variant="default"
                      className="bg-[#ef233c]/80 hover:bg-[#ef233c] text-white transition-all duration-300 backdrop-blur-sm rounded-xl"
                    >
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 transition-transform duration-300 hover:scale-110 active:scale-95"
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
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-3 pt-3 pb-4 backdrop-blur-xl bg-[#121317]/80 rounded-2xl border border-white/5 shadow-lg p-2">
                  <div className="space-y-1">
                    {publicLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`py-2.5 px-4 rounded-xl block transition-colors duration-300 ${
                          pathname === link.href
                            ? 'text-[#ef233c]'
                            : 'text-white hover:text-[#ef233c]'
                        }`}
                        onClick={(e) => handleSmoothScroll(e, link.href)}
                      >
                        <div className="flex items-center">
                          <span>{link.label}</span>
                          {pathname === link.href && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ef233c]"
                            />
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {isAuthenticated && (
                    <div className="space-y-1 pt-1 border-t border-[#8d99ae]/10">
                      {authLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`py-2.5 px-4 rounded-xl block transition-colors duration-300 ${
                            pathname === link.href
                              ? 'text-[#ef233c]'
                              : 'text-white hover:text-[#ef233c]'
                          }`}
                          onClick={closeMobileMenu}
                        >
                          <div className="flex items-center">
                            <span>{link.label}</span>
                            {pathname === link.href && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ef233c]"
                              />
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {isAuthenticated ? (
                    <div className="pt-2 border-t border-[#8d99ae]/10 px-3">
                      <div className="px-2 py-2 text-sm text-[#8d99ae]">
                        Signed in as {user?.name || 'User'}
                      </div>
                      <button
                        className="w-full text-left mt-1 px-4 py-2.5 text-white bg-[#ef233c]/80 hover:bg-[#ef233c] rounded-xl transition-colors duration-300"
                        onClick={handleLogout}
                        disabled={loading}
                      >
                        {loading ? 'Logging out...' : 'Logout'}
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[#8d99ae]/10 px-3 space-y-2">
                      <Link
                        href="/login"
                        className="block px-4 py-2.5 text-center text-white hover:text-[#ef233c] border border-white/10 rounded-xl transition-colors duration-300"
                        onClick={closeMobileMenu}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2.5 text-center bg-[#ef233c]/80 hover:bg-[#ef233c] text-white rounded-xl transition-colors duration-300"
                        onClick={closeMobileMenu}
                      >
                        Register
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
