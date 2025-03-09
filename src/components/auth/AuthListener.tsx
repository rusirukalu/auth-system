'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, clearUser } from '@/redux/features/authSlice';
import { useGetCurrentUserQuery } from '@/redux/services/authApi';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export function AuthListener() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  // Skip the query entirely on public pages
  const isPublicPage =
    pathname === '/' || pathname === '/login' || pathname === '/register';
  const { data, error, isLoading } = useGetCurrentUserQuery(undefined, {
    // Skip the query on public pages
    skip: isPublicPage,
  });

  useEffect(() => {
    // If we have user data, set it in the state
    if (data && data.success && data.data) {
      dispatch(setUser(data.data));
    }

    // If there's an error, clear the user state
    if (error) {
      dispatch(clearUser());

      // Show toast only for non-public pages
      if ('status' in error && error.status === 401 && !isPublicPage) {
        toast('Authentication Error', {
          description: 'Please log in to continue',
        });
      }
    }
  }, [data, error, dispatch, isPublicPage]);

  return null;
}
