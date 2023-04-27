import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    user_id:{
      type: String,
      required: true,
    },
    school: {
=======
    schoolTitle: {
>>>>>>> education-mvp-front
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
=======
    graduationDate: {
      type: String,
      required: true,
    },
    gpa: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
>>>>>>> education-mvp-front
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
