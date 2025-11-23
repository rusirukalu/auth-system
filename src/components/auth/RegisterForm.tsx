'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, RegisterFormValues } from '@/lib/schemas/auth';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function RegisterForm() {
  const { register, loading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setAuthError(null);
    const { confirmPassword, ...userData } = values;
    const success = await register(userData);
    if (!success) {
      setAuthError('REGISTRATION_FAILED');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto bg-black border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-cyan-500">
              NEW_USER_PROTOCOL
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-center uppercase tracking-tighter">
            Initialize Account
          </CardTitle>
          <CardDescription className="text-center font-mono text-xs">
            CREATE_NEW_IDENTITY_RECORD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-wider">
                      Identity_Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="FULL NAME"
                        {...field}
                        disabled={loading}
                        className="bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-wider">
                      Email_Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="USER@DOMAIN.COM"
                        type="email"
                        {...field}
                        disabled={loading}
                        className="bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-wider">
                      Secret_Key
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        disabled={loading}
                        className="bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold tracking-wider">
                      Verify_Key
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                        disabled={loading}
                        className="bg-white/5 border-white/10 focus:border-cyan-500 text-white placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="font-mono text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {authError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-xs font-mono"
                >
                  [ERROR] {authError}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest mt-4"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse">PROCESSING...</span>
                  </div>
                ) : (
                  'REGISTER_IDENTITY'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/10 pt-6">
          <p className="text-xs text-gray-500 font-mono">
            EXISTING_RECORD?{' '}
            <Link
              href="/login"
              className="text-cyan-500 hover:text-cyan-400 hover:underline"
            >
              ACCESS_LOGIN
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
