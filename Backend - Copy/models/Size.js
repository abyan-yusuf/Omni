const { Schema, model } = require("mongoose");

const sizeSchema = new Schema({
  size: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = model('size', sizeSchema);
