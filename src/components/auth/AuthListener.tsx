'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, clearUser } from '@/redux/features/authSlice';
import { useGetCurrentUserQuery } from '@/redux/services/authApi';
import { toast } from 'sonner';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export function AuthListener() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Remove the _redirected param if it exists to keep URLs clean
  useEffect(() => {
    if (searchParams.has('_redirected')) {
      // Create new URLSearchParams without _redirected
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('_redirected');

      // Replace the URL without the parameter
      const newPath =
        pathname + (newParams.toString() ? `?${newParams.toString()}` : '');
      router.replace(newPath);
    }
  }, [pathname, searchParams, router]);

  // Skip the query entirely on public pages
  const isPublicPage =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/about';
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

      // Show toast only for non-public pages and not on redirects
      if (
        'status' in error &&
        error.status === 401 &&
        !isPublicPage &&
        !searchParams.has('_redirected')
      ) {
        toast('Authentication Error', {
          description: 'Please log in to continue',
        });
      }
    }
  }, [data, error, dispatch, isPublicPage, searchParams]);

  return null;
}
