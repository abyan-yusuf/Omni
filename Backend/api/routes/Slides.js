import { Router } from "express";
import { createSlide, deleteSlide, getAllSlides, getSlideImage } from "../controllers/Slides.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.get("/all-slides", getAllSlides)

router.post("/create",ExpressFormidable(), createSlide)

router.delete("/delete/:id", deleteSlide)

router.get('/image/:id', getSlideImage)

export default router;