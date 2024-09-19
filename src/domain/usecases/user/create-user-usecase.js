import { DEFAULT_AVATAR_URL } from "@/shared/constants";

export default class CreateUserUseCase {
  constructor(userRepository, supabaseClient) {
    this.userRepository = userRepository;
    this.supabaseClient = supabaseClient;
  }

  async execute({ username, identifier, email, password }) {
    const existingEmail = await this.userRepository.findByEmail(email);
    const existingIdentifier = await this.userRepository.findByIdentifier(identifier);

    if (existingEmail || existingIdentifier) {
      throw new Error("Email or identifier already in use.");
    }

    const { data, error: signupError } = await this.supabaseClient.auth.signUp({ email, password });
    const newUser = await this.userRepository.create({
      gid: data.user.id,
      name: username,
      identifier,
      email,
      avatarUrl: DEFAULT_AVATAR_URL
    });

    if (signupError) {
      throw new Error("An error occurred while creating the account.");
    }

    return newUser;
  }
}
