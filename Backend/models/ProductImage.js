const mongoose = require("mongoose");
const { model, Schema, ObjectId } = mongoose;

const pISchema = new Schema({
  product_color: {
    type: ObjectId,
    ref: "product_color",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  default: Boolean,
});

module.exports = model("product_Image", pISchema);
