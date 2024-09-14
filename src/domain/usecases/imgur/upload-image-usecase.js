import ImgurRepository from "@/infrastructure/repositories/imgur-repository";

export default class UploadImageUseCase {
	constructor() {
	  this.imgurRepository = new ImgurRepository();
	}

	async execute(imageFile) {
    return await this.imgurRepository.uploadImage(imageFile);
  }
}