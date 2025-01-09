import mongoose, { model, Schema } from "mongoose";

const pcSchema = new Schema({
    product: {
        type: mongoose.ObjectId,
        ref: "product"
    },
    color: {
        type: mongoose.ObjectId,
        ref: "color"
    },
    default: {
        type: Boolean,
        default: false
    }
})

export default model("product_color", pcSchema)