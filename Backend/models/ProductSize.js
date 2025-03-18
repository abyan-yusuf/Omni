const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const psSchema = new Schema({
  color: {
    type: mongoose.ObjectId,
    ref: "product_color",
  },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "sizes" }],
});

module.exports = model("product_Size", psSchema);
