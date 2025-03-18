const { model, Schema } = require("mongoose");

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model("color", colorSchema);
