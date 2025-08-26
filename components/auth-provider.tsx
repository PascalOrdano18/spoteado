"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientSupabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// 🎯 Tipos para nuestro contexto
interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// 📦 Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🏗️ Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Database["public"]["Tables"]["profiles"]["Row"] | null>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClientSupabase();

  // 🔄 Función para obtener perfil del usuario
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error in fetchProfile:", error);
      return null;
    }
  };

  // 🔄 Función para refrescar perfil (útil después de actualizaciones)
  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  // 🚪 Función para cerrar sesión
  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      // El listener se encargará de limpiar el estado
    } catch (error) {
      console.error("Error in signOut:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🎧 Escuchar cambios en la autenticación
  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setLoading(false);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        // Si hay usuario, obtener su perfil
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 🎧 Listener para cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Usuario logueado - obtener perfil
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          // Usuario deslogueado - limpiar perfil
          setProfile(null);
        }

        setLoading(false);
      }
    );

    // 🧹 Cleanup del listener
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // 📦 Valor del contexto
  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 🪝 Hook para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

// 🪝 Hook específico para el usuario (más conveniente)
export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

// 🪝 Hook específico para el perfil
export function useProfile() {
  const { profile, loading, refreshProfile } = useAuth();
  return { profile, loading, refreshProfile };
}
