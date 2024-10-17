import { Router } from "express";
import {
  createPColor,
  createPImage,
  createProduct,
  createPSize,
  getAllProducts,
} from "../controllers/Product.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.post("/create", requireSignIn, isAdmin, createProduct);

router.post("/create-color", requireSignIn, isAdmin, createPColor);

router.post(
  "/create-image",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createPImage
);

router.post("/create-size", requireSignIn, isAdmin, createPSize);

router.get("/all", getAllProducts);

export default router;
