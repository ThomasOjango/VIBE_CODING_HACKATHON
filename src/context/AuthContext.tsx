import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { authService } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: SupabaseUser | null;
  userProfile: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock user profile for demo when no database is available
  const createMockProfile = (user: SupabaseUser): User => ({
    id: user.id,
    email: user.email || '',
    full_name: user.user_metadata?.full_name || 'Demo User',
    age: user.user_metadata?.age || 25,
    weight: 70,
    height: 175,
    activity_level: user.user_metadata?.activity_level || 'moderate',
    goals: ['fitness', 'health'],
    language: user.user_metadata?.language || 'en',
    location: user.user_metadata?.location || 'Nairobi',
    created_at: user.created_at || new Date().toISOString()
  });

  useEffect(() => {
    // For demo purposes, we'll simulate authentication state
    const checkAuth = () => {
      const savedUser = localStorage.getItem('demo-user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setUser(user);
        setUserProfile(createMockProfile(user));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    const result = await authService.signUp(email, password, userData);
    
    if (result.data?.user) {
      // Store user in localStorage for demo
      localStorage.setItem('demo-user', JSON.stringify(result.data.user));
      setUser(result.data.user);
      setUserProfile(createMockProfile(result.data.user));
    }
    
    return result;
  };

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    
    if (result.data?.user) {
      // Store user in localStorage for demo
      localStorage.setItem('demo-user', JSON.stringify(result.data.user));
      setUser(result.data.user);
      setUserProfile(createMockProfile(result.data.user));
    }
    
    return result;
  };

  const signOut = async () => {
    localStorage.removeItem('demo-user');
    setUser(null);
    setUserProfile(null);
    await authService.signOut();
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};