const express = require("express");
const {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getImageById,
  getSubCategoryById,
  updateSubCategory,
} = require("../controllers/SubCategory");
const formidable = require("express-formidable");
const { isAdmin, requireSignIn } = require("../middlewares/Auth");

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

module.exports = router;
