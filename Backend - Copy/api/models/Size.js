import { model, Schema } from "mongoose";

const sizeSchema = new Schema({
    size: {
        type: Number,
        required: true,
        unique: true
    }
})

export default model("size", sizeSchema)