import mongoose, { model, Schema } from "mongoose";

const pISchema = new Schema({
    product: {
        type: mongoose.ObjectId,
        ref: "product"
    },
    color: {
        type: mongoose.ObjectId,
        ref: "color"
    },
    
})

export default model("product_Item", pISchema)