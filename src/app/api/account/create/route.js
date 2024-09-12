import { PrismaClient } from "@prisma/client";
import { createClient } from "@/lib/supabase/server";

const prisma = new PrismaClient();

export async function POST(request) {
	const { username, identifier, email, password } = await request.json();

	const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  const existingIdentifier = await prisma.user.findUnique({
    where: { identifier },
  });

  if (existingEmail || existingIdentifier)
  	return Response.json({ error: "Email or identifier already in use." }, { status: 400 });

	const supabase = createClient();
  const newUser = await prisma.user.create({
  	data: {
  		name: username,
  		identifier,
  		avatarUrl: "https://avatar.iran.liara.run/public/48",
  		email
  	}
  });

  const { error: signupError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signupError)
  	return Response.json({ error: "An error occurred while creating the account." }, { status: 500 });

  return Response.json({ message: "Account created successfully, check your email to verify your account." }, { status: 200 })
}
