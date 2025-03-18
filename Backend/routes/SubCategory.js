const express = require("express");
const {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getImageById,
  getSubCategoriesByParentCat,
  getSubCategoryById,
  updateSubCategory,
} = require("../controllers/SubCategory.js");

const formidable = require("express-formidable");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.get("/all-sub-categories", getAllSubCategories);

router.get("/single/:subid", getSubCategoryById);

router.post("/create", requireSignIn, isAdmin, formidable(), createSubCategory);

router.put(
  "/update/:subid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateSubCategory
);

router.delete("/delete/:subid", requireSignIn, isAdmin, deleteSubCategory);

router.get("/image/:subid", getImageById);

router.get("/all/:parentCat", getSubCategoriesByParentCat);

module.exports = router;
