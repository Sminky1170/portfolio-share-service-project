import { User , Like } from "../db/index.js";

class LikeService {
  // 좋아요 생성
  static async createLike({ following_user_id, followed_user_id }) {
    const newLike = { following_user_id, followed_user_id };
    const createdLike = await Like.createLike({ newLike });
    return createdLike;
  }

  // 좋아요 삭제
  static async deleteLike({ following_user_id, followed_user_id }) {
    const deleteResult = await Like.deleteLike({ following_user_id, followed_user_id });
    return deleteResult.deletedCount > 0;
  }

  // 로그인한 유저가 좋아요한 특정 유저 조회
  static async getLikesByFollowingUserId({ following_user_id }) {
    const likes = await Like.findByFollowingUserId({ following_user_id });
    return likes;
  }

  // 특정 유저를 좋아요한 유저 조회
  static async getLikesByFollowedUserId({ followed_user_id }) {
    const likes = await Like.findByFollowedUserId({ followed_user_id });
    return likes;
  }
}

export { LikeService };
