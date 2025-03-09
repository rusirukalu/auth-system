'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { useGetCurrentUserQuery } from '@/redux/services/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isLoading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }

    // If adminOnly is true, check if user is admin
    if (!isLoading && adminOnly && user && !user.isAdmin) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router, adminOnly]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-accent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!isAuthenticated) {
    return null;
  }

  // If adminOnly and user is not admin, don't render children
  if (adminOnly && user && !user.isAdmin) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
}
