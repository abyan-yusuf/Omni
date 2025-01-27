import { Router } from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  getColorById,
  updateColor,
} from "../controllers/Color.js";
import formidable from "express-formidable";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";

const router = Router();

router.post("/create", requireSignIn, isAdmin, createColor);

router.put(
  "/update/:cid",
  requireSignIn,
  isAdmin,
  updateColor
);

router.delete("/delete/:cid", requireSignIn, isAdmin, deleteColor);

router.get("/single/:cid", getColorById);

router.get("/all-colors", getAllColors);

export default router;
