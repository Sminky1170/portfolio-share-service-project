import pkg from 'mongoose';
const { Schema, model } = pkg;

const LikeSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    portfolio_id:{
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