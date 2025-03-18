const Slides = require("../models/Slides");
const { readFileSync } = require("fs");

exports.createSlide = async (req, res) => {
  try {
    const { image } = req.files;
    if (!image) {
      return res.status(404).send({ message: "Please select an image" });
    } else {
      const newSlides = new Slides();
      newSlides.image.data = readFileSync(image.path);
      newSlides.image.contentType = image.type;
      await newSlides.save();
      return res
        .status(200)
        .send({ message: "Slide created successfully", newSlides });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getAllSlides = async (req, res) => {
  try {
    const images = await Slides.find({}).select("_id");
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSlides = await Slides.findByIdAndDelete(id);
    if (!deletedSlides) {
      return res.status(500).send({ message: "Slides not found" });
    }
    return res
      .status(200)
      .send({ message: "Slides deleted successfully", deletedSlides });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.getSlideImage = async (req, res) => {
  try {
    const image = await Slides.findById(req.params.id).select("image");
    if (!image) {
      return res.status(500).send({ message: "Slide not found" });
    } else {
      res.set("Content-Type", image.image.contentType);
      res.send(image.image.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
