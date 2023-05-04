import { educationService } from "../services/edcuationService.js";
import Joi from "joi";

const postEducationSchema = Joi.object({
    user_id: Joi.string().required(),
    school: Joi.string().required(),
    major: Joi.string().required(),
    degree: Joi.string().required(),
  });
  
const putEducationSchema = Joi.object({
    id: Joi.string().required(),
    school: Joi.string().required(),
    major: Joi.string().required(),
    degree: Joi.string().required(),
  });

  module.exports = {
    postEducationSchema,
    putEducationSchema
  };