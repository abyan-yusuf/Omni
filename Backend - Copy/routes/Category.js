const express = require("express");
const formidable = require("express-formidable");
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getImageById,
  updateCategory,
} = require("../controllers/Category");
const { isAdmin, requireSignIn } = require("../middlewares/Auth");

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
