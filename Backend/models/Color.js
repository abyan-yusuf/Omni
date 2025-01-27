import { model, Schema } from "mongoose";

const colorScema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model("color", colorScema);
