'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/ui/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Form schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form handling
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const success = await login(values);
      if (!success) {
        setAuthError('Invalid email or password');
      }
    } catch (error) {
      setAuthError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col bg-[#121317] text-white">
      <Navbar />

      <div className="flex-grow flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center">
          {/* Left side with branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 p-6 lg:p-12 mb-8 lg:mb-0"
          >
            {/* Background elements */}
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#ef233c] opacity-5 blur-[100px]"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#2b2d42] opacity-10 blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center mb-6">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8d99ae]">
                  Welcome Back!
                </h1>
              </div>

              <p className="text-[#edf2f4]/80 text-lg mb-8">
                Sign in to access your account.
              </p>

              <div className="space-y-4 hidden lg:block">
                <h2 className="text-xl font-semibold text-white">
                  Secure Authentication
                </h2>
                <ul className="space-y-3">
                  {[
                    'JWT tokens with HTTP-only cookies',
                    'Bcrypt password hashing',
                    'Protected routes and API endpoints',
                    'Comprehensive error handling',
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-center text-[#8d99ae]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-[#ef233c]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right side with login form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 p-6 lg:p-12"
          >
            <div className="max-w-md mx-auto">
              <div className="backdrop-blur-xl bg-[#2b2d42]/10 p-8 rounded-2xl border border-white/5 shadow-2xl relative">
                {/* Subtle glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ef233c]/0 via-[#ef233c]/10 to-[#ef233c]/0 rounded-2xl blur-lg opacity-50"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white block">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          {...form.register('email')}
                          type="email"
                          placeholder="you@example.com"
                          className="w-full bg-[#1a1c25] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ef233c]/50 focus:border-[#ef233c] transition-all duration-300 placeholder:text-[#8d99ae]/50"
                        />
                        {form.formState.errors.email && (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#ef233c] text-xs mt-1 block"
                          >
                            {form.formState.errors.email.message}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-white block">
                          Password
                        </label>
                        <a
                          href="#"
                          className="text-xs text-[#8d99ae] hover:text-[#ef233c] transition-colors duration-300"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          {...form.register('password')}
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-[#1a1c25] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ef233c]/50 focus:border-[#ef233c] transition-all duration-300 placeholder:text-[#8d99ae]/50"
                        />
                        {form.formState.errors.password && (
                          <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#ef233c] text-xs mt-1 block"
                          >
                            {form.formState.errors.password.message}
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {authError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#ef233c]/10 text-[#ef233c] px-4 py-3 rounded-lg text-sm"
                      >
                        {authError}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-[#ef233c] to-[#d90429] hover:from-[#d90429] hover:to-[#ef233c] text-white py-3 rounded-xl transition-all duration-500 shadow-md hover:shadow-lg hover:shadow-[#ef233c]/20 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ef233c]/50 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          Signing in...
                        </span>
                      ) : (
                        'Login to Account'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-[#8d99ae]">
                      Don&apos;t have an account?{' '}
                      <Link
                        href="/register"
                        className="text-[#ef233c] hover:text-white transition-colors duration-300 hover:underline"
                      >
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
