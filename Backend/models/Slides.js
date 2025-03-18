const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const SlideSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = model("slide", SlideSchema);
