const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = model("sub-Category", subCategorySchema);
