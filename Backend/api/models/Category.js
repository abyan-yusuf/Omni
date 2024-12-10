import { model, Schema } from "mongoose";

const categoryScema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

export default model("category", categoryScema)