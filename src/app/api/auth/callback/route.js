import supabase from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("access_token");
    const refreshToken = url.searchParams.get("refresh_token");
    const type = url.searchParams.get("type");

    if (token) {
      const { data, error } = await supabase.auth.api.getUser(token);
      if (error) {
        return Response.json({ error: "Failed to fetch user data." }, { status: 500 });
      }

      redirect('/');
    }

  } catch (error) {
    return Response.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
