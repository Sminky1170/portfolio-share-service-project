import { LikeModel } from "../schemas/like.js";

class like {
  // 좋아요 생성
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }
  
 // 특정 유저가 특정 포트폴리오를 좋아요 했는지 확인
  static async findByPortfolioId({ user_id, portfolio_id }) {
    // LikeModel의 findOne 메서드를 사용하여 해당 유저와 포트폴리오에 대한 좋아요를 조회
    const like = await LikeModel.findOne({ user_id, portfolio_id });
    return like;
  }
  // 특정 유저가 좋아요한 포트폴리오 수 조회
  static async findByUserIdCount({ user_id }) {
      // 해당 유저가 좋아요한 모든 데이터를 조회, count
    const likes = await LikeModel.find({ user_id }).count();
    return likes;
  }

  // 좋아요 삭제
  static async deleteById({ user_id, portfolio_id }) {
     // 해당 유저와 포트폴리오에 대한 좋아요 데이터를 삭제
    const deleteLike = await LikeModel.deleteOne({ user_id, portfolio_id });
    return deleteLike;
  }
}

export { Like };
