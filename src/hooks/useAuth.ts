import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth/auth.service';
import type { User } from '@/types/auth.types';

export function useAuth() {
  const { user, session, isLoading, setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        const session = await authService.getCurrentSession();
        
        if (mounted) {
          setSession(session);
          if (session?.user) {
            const profile = await authService.getProfile(session.user.id);
            setUser(profile as User);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('abcdefghij')) {
          return; // Ignore real auth state changes in demo mode
        }
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            const profile = await authService.getProfile(currentSession.user.id);
            setUser(profile as User);
          } catch (error) {
            console.error('Error getting profile on auth change:', error);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setUser, setLoading]);

  return { user, session, isLoading };
}
