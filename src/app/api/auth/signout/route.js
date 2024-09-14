import { createClient } from "@/infrastructure/libraries/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    return new Response("Logout failed", { status: 500 });
  }

  redirect("/auth/signin");
}