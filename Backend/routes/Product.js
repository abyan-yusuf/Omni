import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductDetailsImage,
  getProductImage,
  updateProduct,
} from "../controllers/Product.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";
import ExpressFormidable from "express-formidable";

const router = Router();

router.post("/create", requireSignIn, isAdmin, ExpressFormidable(), createProduct);

router.put("/update/:id", requireSignIn, isAdmin,ExpressFormidable() , updateProduct);

router.get("/all", getAllProducts);

router.delete("/delete/:id", requireSignIn, isAdmin, deleteProduct);

router.get("/image/:id", getProductImage)

router.get("/image/details/:id", getProductDetailsImage)

router.get("/single/:id", getProductById);

export default router;
