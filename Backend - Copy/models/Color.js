const { model, Schema } = require("mongoose");

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

module.exports = model("color", colorScema);
