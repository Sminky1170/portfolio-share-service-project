import { User , Like } from "../db/index.js";

class likeService {
  //좋아요 추가 (user_id, portfolio_id 둘다 입력되어야 함)
  static async addLike({ user_id, portfolio_id }) {
    const newLike = { user_id, portfolio_id };

    if (!user_id || !portfolio_id) {
      throw new Error("입력정보 없음");
    }

    const likeUp = await Like.createLike({ newLike });
    likeUp.errorMessage = null;

    return likeUp;
  }
  // 특정 사용자의 좋아요 갯수 반환
  static async likeCount({ user_id }) {
    const counts = await Like.findByUserIdCount({ user_id });
    return counts;
  }
  // 특정 사용자가 특정 포트폴리오에 좋아요 눌렀는지 확인
  static async findPortfolioId({ user_id, portfolio_id }) {
    const foundlike = await Like.findByPortfolioId({ user_id, portfolio_id });
    return foundlike;
  }
  // 특정 사용자가 특정 포트폴리오에 좋아요 취소
  static async portfolioUnlike({ user_id, portfolio_id }) {
    const unlike = await Like.deleteById({ user_id, portfolio_id });
    return unlike;
  }
}

export { likeService };
