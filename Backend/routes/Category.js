const express = require("express");
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getImageById,
  updateCategory,
} = require("../controllers/Category.js");
const formidable = require("express-formidable");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, formidable(), createCategory);

router.put(
  "/update/:catid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateCategory
);

router.delete("/delete/:catid", requireSignIn, isAdmin, deleteCategory);

router.get("/single/:catid", getCategoryById);

router.get("/all-categories", getAllCategories);

router.get("/image/:catid", getImageById);

module.exports = router;
