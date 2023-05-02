import { LikeModel } from "../schemas/like.js";

class Like {
  // 좋아요 생성
  static async createLike({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  //좋아요 삭제
  static async deleteLike({ following_user_id, followed_user_id }) {
    const deleteResult = await LikeModel.deleteOne({ following_user_id, followed_user_id });
    return deleteResult;
  }
  
 // 로그인한 유저가 좋아요한 특정 유저 조회
  static async findByFollowingUserId({ following_user_id }) {
    const likes = await LikeModel.find({ following_user_id });
    return likes;
  }

  // 특정 유저를 좋아요한 유저 조회
  static async findByFollowedUserId({ followed_user_id }) {
    const likes = await LikeModel.find({ followed_user_id });
    return likes;
  }
}

export { Like };


// static async findByFollowedId({ following_user_id, followed_user_id }) {
//     // LikeModel의 findOne 메서드를 사용하여 해당 유저와 포트폴리오에 대한 좋아요를 조회
//     const like = await LikeModel.findOne({ following_user_id, followed_user_id  });
//     return like;
//   }
//   // 특정 유저가 좋아요한 포트폴리오 수 조회
//   static async findByFollowingCount({ following_user_id }) {
//       // 해당 유저가 좋아요한 모든 데이터를 조회, count
//     const likes = await LikeModel.find({ following_user_id }).count();
//     return likes;
//   }

//   // 좋아요 삭제
//   static async deleteById({ following_user_id, followed_user_id }) {
//      // 해당 유저와 포트폴리오에 대한 좋아요 데이터를 삭제
//     const deleteLike = await LikeModel.deleteOne({ following_user_id, followed_user_id });
//     return deleteLike;
//   }