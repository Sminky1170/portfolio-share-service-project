import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { projectService } from "../services/projectService.js";
const projectRouter = Router();

// 프로젝트 정보 추가
projectRouter.post("/projects", async (req, res, next) => {
  // @sindresorhus/is 패키지의 is.emptyObject 함수를 사용해 HTTP 요청의 body가 비어있는지 검사함(비었으면 에러 발생)
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { user_id, title, start_date, end_date } = req.body;

    // 위 데이터를 유저 db에 추가하기: projectService의 addProject 함수를 호출해 해당 요청 사용자의 학력 정보를 추가함
    const newProject = await projectService.addProject({
      user_id,
      title,
      start_date,
      end_date,
    });

    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

// 프로젝트 정보 조회
projectRouter.get(
  "/projects/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      // 요청으로부터 user_id값 가져옴 (URL에서 id값 추출)
      const { user_id } = req.params;
      // projectService.getProject 메서드로 학력 ID에 대한 정보를 가져옴
      const project = await projectService.getProjects({ user_id });

      // 에러메시지 존재시 에러 던짐
      if (project.errorMessage) {
        throw new Error(project.errorMessage);
      }

      // 성공적으로 학력 정보 가져오면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
);

// 학력 정보 수정
projectRouter.put("/projects/:id", login_required, async (req, res, next) => {
  try {
    let project_id = req.params.id;

    const title = req.body.title;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    const toUpdate = { title, start_date, end_date };

    // 추출한 필드값을 setProject 메소드의 인자로 전달하여 해당 프로젝트 정보 업데이트
    const updatedProject = await projectService.setProject({
      project_id,
      toUpdate,
    });

    // 에러메시지 존재시 에러 던짐
    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    // 성공하면 HTTP응답코드(200)와 함께 응답, 에러 발생시 next로 미들웨어 함수로 에러 던짐
    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

//학력 정보 삭제
projectRouter.delete(
  "/projects/:id",
  login_required,
  async (req, res, next) => {
    try {
      const project_id = req.params.id;
      const result = await projectService.deleteProject({ project_id });

      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }
);

export { projectRouter };
