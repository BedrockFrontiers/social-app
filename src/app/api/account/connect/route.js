import { createClient } from "@/infrastructure/libraries/supabase/server";

export async function POST(request) {
	const { email, password } = await request.json();
	const supabase = createClient();

	const { user, session, error } = await supabase.auth.signInWithPassword({
	  email,
	  password
	});

	if (error)
		return Response.json({ error: "An error occurred while connecting on account." }, { status: 500 });

	return Response.json({ message: "Account connected with successfully.", session });
}