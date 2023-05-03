import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { LikeService } from "../services/LikeService.js";
import { userAuthService } from "../services/userService.js"
const likeRouter = Router();

// 좋아요 생성
likeRouter.post('/likes', login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const { following_user_id, followed_user_id } = req.body;

    const user = await userAuthService.getUserById(req.user_id);
    const existingLike = user.likes.find(like => like.followed_user_id === followed_user_id);

    if (existingLike) {
      existingLike.isLiked = true;
      await user.save();
    } else {
      user.likes.push({ followed_user_id, isLiked: true });
      await user.save();
    }

    const newLike = await LikeService.createLike({
      following_user_id,
      followed_user_id
    });

    return res.status(201).json({ isLiked: true, likes: user.likes });
  } catch (error) {
    next(error);
  }
});

// 좋아요 삭제
likeRouter.delete('/likes', login_required, async (req, res, next) => {
  try {
    const { following_user_id, followed_user_id } = req.body;
    const user = await userAuthService.getUserById(req.user_id);
    const existingLike = user.likes.find(like => like.followed_user_id === followed_user_id);

    if (existingLike) {
      existingLike.isLiked = false;
      await user.save();
    }

    const isDeleted = await LikeService.deleteLike({ following_user_id, followed_user_id });
    if (isDeleted) {
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: '삭제할 좋아요가 없습니다.' });
    }
  } catch (error) {
    next(error);
  }
});

// 로그인한 유저가 좋아요한 특정 유저 조회
likeRouter.get('/likes/:following_user_id', login_required, async (req, res, next) => {
  try {
    const { following_user_id } = req.params;
    const likes = await LikeService.getLikesByFollowingUserId({ following_user_id });
    
    return res.status(200).json(likes);
  } catch (error) {
  next(error);
  }
});

// 특정 유저를 좋아요한 유저 조회
likeRouter.get('/likelist/:followed_user_id', login_required, async (req, res, next) => {
  try {
    const { followed_user_id } = req.params;
    const likes = await LikeService.getLikesByFollowedUserId({ followed_user_id });
    if (likes.errorMessage) {
      throw new Error(likes.errorMessage);
    }
    return res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };