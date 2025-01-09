const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SlideSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = model("slide", SlideSchema);
