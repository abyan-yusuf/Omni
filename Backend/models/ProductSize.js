import mongoose, { model, Schema } from "mongoose";

const psSchema = new Schema({
  color: {
    type: mongoose.ObjectId,
    ref: "product_color",
  },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "sizes" }],
});

export default model("product_Size", psSchema);
