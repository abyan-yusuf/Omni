import { Router } from "express";
import {
  createPColor,
  createPImage,
  createProduct,
  createPSize,
  deletePColor,
  deletePImage,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updatePSize,
} from "../controllers/Product.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.post("/create", requireSignIn, isAdmin, createProduct);

router.put("/update/:id", requireSignIn, isAdmin, updateProduct);

router.post("/create-color", requireSignIn, isAdmin, createPColor);

router.post(
  "/create-image",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createPImage);

router.post("/create-size", requireSignIn, isAdmin, createPSize);

router.get("/all", getAllProducts);

router.delete("/delete-color/:id", requireSignIn, isAdmin, deletePColor);

router.delete("/delete/image/:id", requireSignIn, isAdmin, deletePImage);

router.put("/update/size/:id", requireSignIn, isAdmin, updatePSize);

router.delete("/delete:id", requireSignIn, isAdmin, deleteProduct);

export default router;
