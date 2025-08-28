import { createClient } from '@supabase/supabase-js';

// Use placeholder values that won't cause fetch errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have valid Supabase configuration
const hasValidConfig = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for demonstration when Supabase is not configured
const mockUsers = new Map();
let mockUserId = 1;

export const authService = {
  signUp: async (email: string, password: string, userData: any) => {
    if (!hasValidConfig) {
      // Mock signup for demo purposes
      const userId = `mock-user-${mockUserId++}`;
      const user = {
        id: userId,
        email,
        user_metadata: userData,
        created_at: new Date().toISOString()
      };
      
      mockUsers.set(email, { user, password });
      
      return {
        data: {
          user,
          session: {
            access_token: 'mock-token',
            user
          }
        },
        error: null
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      return { data, error };
    } catch (err) {
      return {
        data: null,
        error: { message: 'Network error. Please check your connection and try again.' }
      };
    }
  },

  signIn: async (email: string, password: string) => {
    if (!hasValidConfig) {
      // Mock signin for demo purposes
      const mockUser = mockUsers.get(email);
      if (mockUser && mockUser.password === password) {
        return {
          data: {
            user: mockUser.user,
            session: {
              access_token: 'mock-token',
              user: mockUser.user
            }
          },
          error: null
        };
      } else {
        return {
          data: null,
          error: { message: 'Invalid email or password' }
        };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (err) {
      return {
        data: null,
        error: { message: 'Network error. Please check your connection and try again.' }
      };
    }
  },

  signOut: async () => {
    if (!hasValidConfig) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err) {
      return { error: null };
    }
  },

  getCurrentUser: async () => {
    if (!hasValidConfig) {
      return null;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (err) {
      return null;
    }
  }
};