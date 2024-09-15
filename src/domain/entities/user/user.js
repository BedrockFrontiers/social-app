export default class User {
  constructor(userObject) {
    this.gid = userObject.gid;
    this.id = userObject.id;
    this.email = userObject.email;
    this.name = userObject.name;
    this.identifier = userObject.identifier;
    this.avatarUrl = userObject.avatarUrl;
    this.bannerUrl = userObject.bannerUrl;
    this.bio = userObject.bio;
    this.verified = userObject.verified;
    this.followers = userObject.followers;
    this.following = userObject.following;
    this.posts = userObject.posts;
    this.likes = userObject.likes;
    this.createdAt = userObject.createdAt;
    this.updatedAt = userObject.updatedAt;
  }

  toJSON() {
    return {
      gid: this.gid,
      id: this.id,
      email: this.email,
      name: this.name,
      identifier: this.identifier,
      avatarUrl: this.avatarUrl,
      bannerUrl: this.bannerUrl,
      bio: this.bio,
      verified: this.verified,
      followers: this.followers,
      following: this.following,
      posts: this.posts,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}