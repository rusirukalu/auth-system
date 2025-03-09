'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, clearUser } from '@/redux/features/authSlice';
import { useGetCurrentUserQuery } from '@/redux/services/authApi';
import { toast } from 'sonner';

export function AuthListener() {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    // If we have user data, set it in the state
    if (data && data.success && data.data) {
      dispatch(setUser(data.data));
    }

    // If there's an error, clear the user state
    if (error) {
      dispatch(clearUser());

      // Only show toast for authentication errors, not on initial load
      if ('status' in error && error.status === 401) {
        // Don't show toast for auth errors on initial page load
        // This prevents annoying "you need to login" messages when users first visit
        if (document.referrer) {
          toast('Authentication Error', {
            description: 'Please log in to continue',
          });
        }
      }
    }
  }, [data, error, dispatch, toast]);

  return null; // This component doesn't render anything
}
