const express = require("express");
const ExpressFormidable = require("express-formidable");
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductDetailsImage,
  getProductImage,
  updateProduct,
} = require("../controllers/Product");
const { isAdmin, requireSignIn } = require("../middlewares/Auth");

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

module.exports = router;
