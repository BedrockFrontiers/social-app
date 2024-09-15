import SessionRepository from "@/infrastructure/repositories/session-repository";

export default class AuthenticateUserUseCase {
  constructor() {
    this.sessionRepository = new SessionRepository();
  }

  async execute(accessGID) {
    if (!accessGID || !accessGID.startsWith("G-ID"))
      throw new Error("Invalid or missing G-ID");

    const gid = accessGID.replace("G-ID ", '').trim();
    const isValid = await this.sessionRepository.validate(gid);

    if (!isValid) throw new Error("Invalid G-ID");

    return gid;
  }
}
