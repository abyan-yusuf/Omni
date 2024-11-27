import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getImageById,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/SubCategory.js";

import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";

const router = Router();

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


export default router;
