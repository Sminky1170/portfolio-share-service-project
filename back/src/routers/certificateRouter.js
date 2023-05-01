import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { certificateService } from "../services/certificateService.js";
const certificateRouter = Router();

certificateRouter.post("/certificates", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, name, organization, issue_date, expiration_date } =
      req.body;

    const newCertificate = await certificateService.addCertificate({
      user_id,
      name,
      organization,
      issue_date,
      expiration_date,
    });

    return res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get(
  "/certificates/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const certificate = await certificateService.getCertificates({ user_id });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      return res.status(200).json(certificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:id",
  login_required,
  async (req, res, next) => {
    try {
      const certificate_id = req.params.id;

      const {name, organization, issue_date, expiration_date} = req.body

      const toUpdate = { name, organization, issue_date, expiration_date };

      const updatedCertificate = await certificateService.setCertificate({
        certificate_id,
        toUpdate,
      });

      // 에러메시지 존재시 에러 던짐
      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      // 성공하면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
      return res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete(
  "/certificates/:id",
  login_required,
  async (req, res, next) => {
    try {
      const certificate_id = req.params.id;
      const result = await certificateService.deleteCertificate({
        certificate_id,
      });

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

export { certificateRouter };
