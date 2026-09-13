"use client";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthValue = {
  user: User | null;
  loading: boolean;
  /** False until the Supabase project is provisioned (plan Phase 4). */
  enabled: boolean;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: true,
  enabled: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const enabled = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  // Nothing will ever load when Supabase is off, so start settled rather
  // than flipping the flag from inside the effect.
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    // Without real credentials every auth call fails on DNS lookup and
    // rejects unhandled, so stay inert until Supabase is configured.
    if (!enabled) return;

    const supabase = createClient();
    let active = true;

    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!active) return;
        setUser(data.user);
        setLoading(false);
      })
      .catch((cause) => {
        console.error("[auth-provider] getUser failed:", cause);
        if (active) setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user ?? null),
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [enabled]);

  return (
    <AuthContext.Provider value={{ user, loading, enabled }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
