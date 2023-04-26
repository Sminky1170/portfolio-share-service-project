import { User, Education } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class educationService {
  static async addEducation({ user_id, school, major, degree, entrance_date, graduation_date }) {
    const user = await User.findById({ user_id });
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const id = uuidv4();
    const newEducation = { id, school, major, degree, entrance_date, graduation_date, user_id };
    const createdEducation = await Education.create({ newEducation });
    createdEducation.errorMessage = null;
    return createdEducation;
  }

  static async getEducations({ user_id }) {
    const educations = await Education.findAll({ user_id });
    return educations;
  }

  static async updateEducation({ education_id, toUpdate }) {
    let education = await Education.findById({ education_id });
    if (!education) {
      const errorMessage = "해당 학력 정보를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.degree) {
      const fieldToUpdate = "degree";
      const newValue = toUpdate.degree;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.entrance_date) {
      const fieldToUpdate = "entrance_date";
      const newValue = toUpdate.entrance_date;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    if (toUpdate.graduation_date) {
      const fieldToUpdate = "graduation_date";
      const newValue = toUpdate.graduation_date;
      education = await Education.update({ education_id, fieldToUpdate, newValue });
    }

    education.errorMessage = null;
    return education;
  }
}

export { educationService };