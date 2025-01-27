import { model, Schema, ObjectId } from "mongoose";

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

export default model("product_Image", pISchema);
