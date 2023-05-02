import { User , Like } from "../db/index.js";

class LikeService {
  async addLike({ user_id, portfolio_id }) {
    const newLike = { user_id, portfolio_id};

    if (!user_id || !portfolio_id) {
      throw new Error("입력정보 없음");
    }

    const likeUp = await Like.create({ newLike });
    likeUp.errorMessage = null;

    return likeUp;
  }
  async likeCount({ user_id }) {
    const counts = await Like.findByUserIdCount({ user_id });
    return counts;
  }
  async findPortfolioId({ user_id, portfolio_id }) {
    const unlike = await Like.findByPortfolioId({ user_id, portfolio_id});
    return unlike;
  }
  async portfolioUnlike({ user_id, portfolio_id }) {
    const unlike = await Like.deleteById({ user_id, portfolio_id });
    return unlike;
  }
}

export { likeService };
