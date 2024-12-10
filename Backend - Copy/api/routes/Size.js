import { Router } from "express";
import {
  getAllSizes,
  getSizeById,
  updateSize,
  createSize,
  deleteSize,
} from "../controllers/Size.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";

const router = Router();

router.get("/all-sizes", getAllSizes);

router.get("/single/:sid", getSizeById);

router.put("/update/:sid", requireSignIn, isAdmin, updateSize);

router.post("/create", requireSignIn, isAdmin, createSize);

router.delete("/delete/:sid", requireSignIn, isAdmin, deleteSize);

export default router;
