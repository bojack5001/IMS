import { supabase } from '@/lib/supabase';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth.types';

export const authService = {
  async login({ email, password }: LoginCredentials) {
    // Demo mode: Bypass real auth if using the dummy Supabase URL or if env vars are missing
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('abcdefghij')) {
      if (email === 'admin@ims' && password === 'admin@123') {
        return {
          user: {
            id: 'demo-user-id',
            email,
          },
          session: {
            access_token: 'demo-token',
          }
        };
      } else {
        throw new Error('Invalid User ID or password. Please use admin@ims / admin@123');
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async register({ email, password, fullName }: RegisterCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentSession(): Promise<any> {
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('abcdefghij')) {
      return { access_token: 'demo-token', user: { id: 'demo-user-id', email: 'admin@demo.com' } };
    }
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async getProfile(userId: string) {
    if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('abcdefghij')) {
      return { id: userId, email: 'admin@demo.com', full_name: 'Admin Demo', role: 'admin' };
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  }
};
