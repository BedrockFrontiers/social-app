import { PrismaClient } from "@prisma/client";
import { createClient } from "@/infrastructure/libraries/supabase/server";
import UserRepository from "@/infrastructure/repositories/user-repository";
import CreateUserUseCase from "@/domain/usecases/user/create-user-usecase";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, identifier, email, password } = await request.json();

    const supabaseClient = createClient();
    const userRepository = new UserRepository(prisma);
    const createUser = new CreateUserUseCase(userRepository, supabaseClient);

    const newUser = await createUser.execute({ username, identifier, email, password });

    return new Response(JSON.stringify({ message: "Account created successfully.", user: newUser }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}