import { createClient } from "@/infrastructure/libraries/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") || null;
  const next = searchParams.get("next") ?? '/';
  
  if (token_hash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error)
      redirect(next);
  }

  redirect('/');
}
