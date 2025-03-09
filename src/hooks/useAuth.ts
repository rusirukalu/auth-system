'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setUser, clearUser, setError } from '@/redux/features/authSlice';
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  RegisterRequest,
  LoginRequest,
} from '@/redux/services/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // RTK Query mutations
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  // Login function
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        toast('Success', {
          description: 'You have been logged in successfully',
        });
        router.push('/dashboard'); // Redirect to dashboard
        return true;
      } else {
        dispatch(setError(response.message || 'Login failed'));
        toast('Login Failed', {
          description: response.message || 'An error occurred during login',
        });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Login failed. Please try again.';
      dispatch(setError(errorMessage));
      toast('Login Error', {
        description: errorMessage,
      });
      return false;
    }
  };

  // Register function
  const register = async (userData: RegisterRequest) => {
    try {
      const response = await registerMutation(userData).unwrap();
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        toast('Account Created', {
          description: 'Your account has been created successfully',
        });
        router.push('/dashboard'); // Redirect to dashboard
        return true;
      } else {
        dispatch(setError(response.message || 'Registration failed'));
        toast('Registration Failed', {
          description: response.message || 'An error occurred during registration',
        });
        return false;
      }
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Registration failed. Please try again.';
      dispatch(setError(errorMessage));
      toast('Registration Error', {
        description: errorMessage,
      });
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(clearUser());
      toast('Logged Out', {
        description: 'You have been logged out successfully',
      });
      router.push('/login'); // Redirect to login page
      return true;
    } catch (error: any) {
      const errorMessage = error.data?.message || 'Logout failed. Please try again.';
      toast('Logout Error', {
        description: errorMessage,
      });
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    loading: loading || isLoginLoading || isRegisterLoading || isLogoutLoading,
    error,
    login,
    register,
    logout,
  };
};
