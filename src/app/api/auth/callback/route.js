import supabase from "@/lib/supabaseClient";

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

      return new Response.redirect('/');
    }

  } catch (error) {
    return Response.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
