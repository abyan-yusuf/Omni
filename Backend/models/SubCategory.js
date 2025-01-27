import mongoose, { model, Schema } from "mongoose";

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentCat: {
      type: mongoose.ObjectId,
      ref: "category",
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String
    },
  },
  { timestamps: true }
);

export default model("sub-Category", subCategorySchema)