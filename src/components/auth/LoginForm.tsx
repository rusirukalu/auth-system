'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, LoginFormValues } from '@/lib/schemas/auth';

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

export function LoginForm() {
  const { login, loading } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setAuthError(null);
    const success = await login(values);
    if (!success) {
      setAuthError('INVALID_CREDENTIALS');
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
              ACCESS_LEVEL_1
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
          </div>
          <CardTitle className="text-2xl font-black text-center uppercase tracking-tighter">
            System Login
          </CardTitle>
          <CardDescription className="text-center font-mono text-xs">
            ENTER_CREDENTIALS_TO_PROCEED
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      Access_Key
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
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-pulse">AUTHENTICATING...</span>
                  </div>
                ) : (
                  'INITIATE_SESSION'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-white/10 pt-6">
          <p className="text-xs text-gray-500 font-mono">
            NO_ACCESS_TOKEN?{' '}
            <Link
              href="/register"
              className="text-cyan-500 hover:text-cyan-400 hover:underline"
            >
              REQUEST_ACCESS
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
