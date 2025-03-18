const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.ObjectId,
      ref: "sub-Category",
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: function () {
        return this.originalPrice;
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    color: {
      type: mongoose.ObjectId,
      ref: "color",
    },
    image1: {
      data: Buffer,
      contentType: String,
    },
    image2: {
      data: Buffer,
      contentType: String,
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "size",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("product", productSchema);
