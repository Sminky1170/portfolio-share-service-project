import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
const awardRouter = Router();

awardRouter.post("/awards", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { user_id, title, organization, date } = req.body;

    const newAward = await awardService.addAward({
      user_id,
      title,
      organization,
      date,
    });
    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awards/:user_id", login_required, async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const award = await awardService.getAwards({ user_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }
    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.put("/awards/:id", login_required, async (req, res, next) => {
  try {
    let award_id = req.params.id;

    const title = req.body.title;
    const organization = req.body.organization;
    const date = req.body.date;

    const toUpdate = { title, organization, date };

    const updatedAward = await awardService.setAward({
      award_id,
      toUpdate,
    });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});
awardRouter.delete("/awards/:id", login_required, async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const result = await awardService.deleteAward({ award_id });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

export { awardRouter };
