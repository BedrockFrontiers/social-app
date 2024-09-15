export default class Follower {
	constructor(followerObject) {
		this.id = followerObject.id;
    this.followingId = followerObject.followingId;
    this.followerId = followerObject.followerId;
    this.following = followerObject.following;
    this.follower = followerObject.follower;
    this.followedAt = followerObject.followedAt;
	}

	toJSON() {
		return {
			id: this.id,
			followingId: this.followingId,
			followerId: this.followerId,
			following: this.following,
			follower: this.follower,
			followedAt: this.followedAt
		}
	}
}