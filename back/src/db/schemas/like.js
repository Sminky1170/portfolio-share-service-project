import pkg from 'mongoose';
const { Schema, model } = pkg;

const LikeSchema = new Schema(
  {
    following_user_id: {
      type: String,
      required: true,
    },
    followed_user_id:{
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };