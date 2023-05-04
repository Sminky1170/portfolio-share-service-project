import { certificateService } from "../services/certificateService.js";
import Joi from "joi";

const postCertificateSchema = Joi.object({
  user_id: Joi.string().required(),
  name: Joi.string().required(),
  organization: Joi.string().required(),
  issue_date: Joi.date().required(),
  expiration_date: Joi.date().required()
});

const putCertificateSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  organization: Joi.string().required(),
  issue_date: Joi.date().required(),
  expiration_date: Joi.date().required()
});

module.exports = {
    postCertificateSchema,
    putCertificateSchema
  };