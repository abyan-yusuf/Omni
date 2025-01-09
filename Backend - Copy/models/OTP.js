const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OTPSchema = new Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "auth",
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

module.exports = model("otp", OTPSchema);
