import UserRepository from "@/infrastructure/repositories/user-repository";

export default class SessionRepository {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async validate(gid) {
		const data = await this.userRepository.findByGID(gid);

		if (!data)
			return false;

		return data?.gid === gid;
	}
}