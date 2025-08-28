import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// 🖥️ Cliente para API Routes (Route Handlers)
export const createServerSupabase = () => {
  return createClientComponentClient<Database>();
};
