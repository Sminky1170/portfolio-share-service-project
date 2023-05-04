import { userAuthService } from "../services/userService.js";
import Joi from "joi";

const postRegisterUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const postLoginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const putUpdateUserSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  description: Joi.string().required(),
});

const putLikesUserSchema = Joi.object({
  user_id: Joi.string().required(),
  pressLikeUserId: Joi.array().items(Joi.string()).required(),
});

const putDislikesUserSchema = Joi.object({
  user_id: Joi.string().required(),
  pressLikeUserId: Joi.array().items(Joi.string()).required(),
});

module.exports = {
  postRegisterUserSchema,
  postLoginUserSchema,
  putUpdateUserSchema,
  putLikesUserSchema,
  putDislikesUserSchema,
};
