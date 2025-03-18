const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const pcSchema = new Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "product",
  },
  color: {
    type: mongoose.ObjectId,
    ref: "color",
  },
  default: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("product_color", pcSchema);
