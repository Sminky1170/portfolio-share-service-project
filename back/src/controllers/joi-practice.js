// import { awardService } from "../services/awardService.js";
// import Joi from "joi";

// const postAwardSchema = Joi.object({
//   user_id: Joi.string().required(),
//   title: Joi.string().required(),
//   organization: Joi.string().required(),
//   date: Joi.string().required(),
// });

// const putAwardSchema = Joi.object({
//   title: Joi.string().required(),
//   organization: Joi.string().required(),
//   date: Joi.string().required(),
// });

// const postAward = async (req, res, next) => {
//   try {
//     const { error } = postAwardSchema.validate(req.body);
//     if (error) {
//       throw new Error(error.details[0].message);
//     }

//     const { user_id, title, organization, date } = req.body;

//     const newAward = await awardService.addAward({
//       user_id,
//       title,
//       organization,
//       date,
//     });
//     return res.status(201).json(newAward);
//   } catch (error) {
//     next(error);
//   }
// };

// const getAward = async (req, res, next) => {
//   try {
//     const { error } = Joi.number().integer().validate(req.params.user_id);
//     if (error) {
//       throw new Error(error.details[0].message);
//     }

//     const { user_id } = req.params;
//     const award = await awardService.getAwards({ user_id });

//     if (award.errorMessage) {
//       throw new Error(award.errorMessage);
//     }
//     return res.status(200).json(award);
//   } catch (error) {
//     next(error);
//   }
// };

// const putAward = async (req, res, next) => {
//   try {
//     const { error: idError } = Joi.number().integer().validate(req.params.id);
//     if (idError) {
//       throw new Error(idError.details[0].message);
//     }

//     const { error: updateError } = putAwardSchema.validate(req.body);
//     if (updateError) {
//       throw new Error(updateError.details[0].message);
//     }

//     const award_id = req.params.id;

//     const { title, organization, date } = req.body;

//     const toUpdate = { title, organization, date };

//     const updatedAward = await awardService.setAward({
//       award_id,
//       toUpdate,
//     });

//     if (updatedAward.errorMessage) {
//       throw new Error(updatedAward.errorMessage);
//     }

//     return res.status(200).json(updatedAward);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteAward = async (req, res, next) => {
//   try {
//     const { error } = Joi.number().integer().validate(req.params.id);
//     if (error) {
//       throw new Error(error.details[0].message);
//     }

//     const award_id = req.params.id;
//     const result = await awardService.deleteAward({ award_id });

//     if (result.errorMessage) {
//       throw new Error(result.errorMessage);
//     }
//     return res.status(200).send(result);
//   } catch (err) {
//     next(err);
//   }
// };

// export { postAward, getAward, putAward, deleteAward };
