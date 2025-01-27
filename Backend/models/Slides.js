import { model, Schema } from "mongoose";

const SlideSchema = new Schema({
    image: {
        data: Buffer,
        contentType: String
    }
})

export default model("slide", SlideSchema)