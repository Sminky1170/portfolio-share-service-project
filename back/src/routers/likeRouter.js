import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { likeService } from "../services/likeService.js";
import { userAuthService } from "../services/userService.js"
const likeRouter = Router();

// 로그인한 사용자가 특정 사용자의 포트폴리오에 좋아요 추가 및 삭제
likeRouter.post("/likes/:user_id", /*login_required,*/ async function (req, res, next) {
  try {
    const { user_id } = req.params;
    const { portfolio_id } = req.body;
    const currentUserInfo = await userAuthService.getUserInfo({ user_id });

    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const like = await likeService.findPortfolioId({ user_id, portfolio_id });
    if (!like) {
      const likeAdd = await likeService.addLike({
        user_id,
        portfolio_id,
      });
      if (likeAdd.errorMessage) {
        throw new Error(likeAdd.errorMessage);
      }
      return res.status(201).json(likeAdd);
    } else if (like) {
      const result = await likeService.portfolioUnlike({ user_id, portfolio_id });
      return res.json("좋아요 취소");
    }
  } catch (error) {
    next(error);
  }
});

// 특정 포트폴리오에 좋아요한 사용자 리스트 반환
// likeRouter.get("/likes/:portfolio_id", /*login_required,*/ async function (req, res, next) {
//   try {
//     const currentUserInfo = await userAuthService.getUserInfo({ user_id });
//     const { portfolio_id } = req.params;
//     const likes = await likeService.getLikeList({ portfolio_id });
//     res.status(200).json(likes);
//   } catch (error) {
//     next(error);
//   }
// });

// 특정 사용자가 받은 총 좋아요 갯수를 반환
likeRouter.get("/likescount/:user_id", /*login_required,*/ async function (req, res, next) {
  try {
    const { user_id } = req.params;
    const counts = await likeService.likeCount({ user_id });

    res.status(200).json(counts);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
