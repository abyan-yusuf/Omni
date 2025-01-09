const { model, Schema } = require("mongoose");

const categoryScema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = model("category", categoryScema);
