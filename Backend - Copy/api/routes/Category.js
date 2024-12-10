import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  getImageById,
  updateCategory,
} from "../controllers/Category.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";

const router = Router();

router.post("/create", requireSignIn, isAdmin, formidable(), createCategory);

router.put("/update/:catid", requireSignIn, isAdmin, formidable(), updateCategory);

router.delete("/delete/:catid", requireSignIn, isAdmin, deleteCategory);

router.get("/single/:catid", getCategoryById);

router.get("/all-categories", getAllCategories);

router.get("/image/:catid", getImageById);

export default router;
