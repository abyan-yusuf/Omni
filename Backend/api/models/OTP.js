import mongoose, { model, Schema } from "mongoose"

const OTPSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: "auth"
    },
    otp: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date
    }
})

export default model("otp", OTPSchema)