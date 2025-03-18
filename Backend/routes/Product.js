const express = require("express");
const {
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
} = require("../controllers/Product.js");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");
const ExpressFormidable = require("express-formidable");

const router = express.Router();

router.post(
  "/create",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProduct
);

router.put(
  "/update/:id",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProduct
);

router.get("/all", getAllProducts);

router.delete("/delete/:id", requireSignIn, isAdmin, deleteProduct);

router.get("/image/:id", getProductImage);

router.get("/image/details/:id", getProductDetailsImage);

router.get("/single/:id", getProductById);

router.get("/latest/:catid", getLatestPorductsByCat);

router.get("/featured", getFeaturedProducts);

router.get("/bestseller", getBestSellerProducts);

router.get("/category/:catid", getProductsByCategory);

router.get("/sub-category/:subcatid", getProductsBySubCategory);

router.get("/similar/:id", getSimilarProducts);

module.exports = router;
