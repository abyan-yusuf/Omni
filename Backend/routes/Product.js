import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getBestSellerProducts,
  getFeaturedProducts,
  getLatestPorductsByCat,
  getProductById,
  getProductDetailsImage,
  getProductImage,
  getProductsByCategory,
  getProductsBySubCategory,
  getSimilarProducts,
  updateProduct,
} from "../controllers/Product.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";
import ExpressFormidable from "express-formidable";
import { get } from "https";

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

router.get("/bestseller", getBestSellerProducts);

router.get("/category/:catid", getProductsByCategory);

router.get("/sub-category/:subcatid", getProductsBySubCategory);

router.get("/similar/:id", getSimilarProducts);

export default router;
