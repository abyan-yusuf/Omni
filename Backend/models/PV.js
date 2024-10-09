import { model, Schema } from "mongoose";

const pvSchema = new Schema({
    item: {
        type: mongoose.ObjectId,
        ref: "product_Item"
    },
    sizes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "size"
    }
})

export default model("product_Variation", pvSchema)