import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: "category"
    },
    subCategory: {
        type: mongoose.ObjectId,
        ref: "sub-Category"
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        default: () => {
            return this.originalPrice
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    bestSeller: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export default model("product", productSchema)