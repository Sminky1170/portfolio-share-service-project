import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { LikeService } from "../services/LikeService.js";
import { userAuthService } from "../services/userService.js"
const likeRouter = Router();

// 좋아요 생성 API
likeRouter.post('/likes', async (req, res) => {
  try {
    const { following_user_id, followed_user_id } = req.body;
    const createdLike = await LikeService.createLike({ following_user_id, followed_user_id });
    res.status(201).json(createdLike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 좋아요 삭제 API
likeRouter.delete('/likes', async (req, res) => {
  try {
    const { following_user_id, followed_user_id } = req.params;
    const isDeleted = await LikeService.deleteLike({ following_user_id, followed_user_id });
    if (isDeleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: '삭제할 좋아요가 없습니다.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 로그인한 유저가 좋아요한 특정 유저 조회 API
likeRouter.get('/likes/:followed_user_id', async (req, res) => {
  try {
    const { following_user_id } = req.params;
    const likes = await LikeService.getLikesByFollowingUserId({ following_user_id });
    res.status(200).json(likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러' });
  }
});

// 특정 유저를 좋아요한 유저 조회 API
likeRouter.get('/likelist/:followed_user_id', async (req, res) => {
  try {
    const { followed_user_id } = req.params;
    const likes = await LikeService.getLikesByFollowedUserId({ followed_user_id });
    res.status(200).json(likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 에러' });
  }
});

export { likeRouter };
