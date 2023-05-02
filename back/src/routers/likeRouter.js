import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { likeService } from "../services/likeService.js";
import { userAuthService } from "../services/userService.js"
const likeRouter = Router();

likeRouter.post("/likes", async function (req, res, next) {
  try {
    const portfolio_id = req.currentUserId;
    const { user_id } = req.body;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id: req.currentUserId,
    });

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
      res.status(201).json(likeAdd);
    } else if (like) {
      const result = await likeService.PortfolioUnlike({ user_id, portfolio_id });
      res.json("좋아요 취소");
    }
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/likes/:portfolio_id", async function (req, res, next) {
  try {
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id: req.currentUserId,
    });
    const { portfolio_id } = req.params;
    const likes = await likeService.getLikeList({ portfolio_id });
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/likescount/:user_id", async function (req, res, next) {
  try {
    const { user_id } = req.params;
    const counts = await likeService.likeCount({ user_id });

    res.status(200).json(counts);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
