import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    schoolName: {  
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
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };