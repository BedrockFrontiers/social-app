export default class Like {
	constructor(likeObject) {
		this.id = likeObject.id;
		this.userId = likeObject.userId;
		this.postId = likeObject.postId;
		this.user = likeObject.user;
		this.post = likeObject.post;
	}

	toJSON() {
		return {
			id: this.id,
			userId: this.userId,
			postId: this.postId,
			user: this.user,
			post: this.post
		};
	}
}