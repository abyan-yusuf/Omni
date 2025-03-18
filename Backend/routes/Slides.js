const express = require("express");
const {
  createSlide,
  deleteSlide,
  getAllSlides,
  getSlideImage,
} = require("../controllers/Slides.js");
const ExpressFormidable = require("express-formidable");

const router = express.Router();

router.get("/all-slides", getAllSlides);

router.post("/create", ExpressFormidable(), createSlide);

router.delete("/delete/:id", deleteSlide);

router.get("/image/:id", getSlideImage);

module.exports = router;
