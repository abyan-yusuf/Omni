const { Schema, model } = require("mongoose");

const DirectorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    about: {
        type: String,
        required: true
    }
})

module.exports = model("director", DirectorSchema);