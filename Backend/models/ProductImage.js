import { model, Schema } from "mongoose";

const pISchema = new Schema(
    {
        product_item: {
            type: mongoose.ObjectId,
            ref: "product_Item"
        },
        image: {
            data: Buffer,
            contentType: String
        }
    }
)

export default model("product_Image", pISchema)