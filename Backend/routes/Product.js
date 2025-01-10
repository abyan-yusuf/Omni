import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getLatestPorductsByCat,
  getProductById,
  getProductDetailsImage,
  getProductImage,
  updateProduct,
  getFeaturedProducts,
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

router.get("/latest/:catid", getLatestPorductsByCat);

router.get("/featured", getFeaturedProducts);

export default router;
