import { createClient } from "@supabase/supabase-js";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// 🌐 URLs y Keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 🖥️ Cliente básico (para casos simples sin auth)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// 📱 Cliente para Client Components (React hooks, useState, etc.)
export const createClientSupabase = () => {
  return createClientComponentClient<Database>();
};

// 🖥️ Cliente para Server Components (getServerSideProps, etc.)
export const createServerSupabase = () => {
  return createServerComponentClient<Database>({ cookies });
};

// 🔑 Cliente Admin (para API routes con permisos completos)
export const createAdminSupabase = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// 🛡️ Cliente para Middleware (para proteger rutas)
export const createMiddlewareSupabase = (req: Request) => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
    },
  });
};