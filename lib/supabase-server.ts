import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

// 🖥️ Cliente para Server Components (getServerSideProps, etc.)
export const createServerSupabase = () => {
  return createServerComponentClient<Database>({ cookies });
};
