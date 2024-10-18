import { Router } from "express";
import {
  createShowroom,
  deleteShowroom,
  getAllShowrooms,
  getNearbyShowrooms,
  updateShowroom,
} from "../controllers/Showroom.js";
import { isAdmin, requireSignIn } from "../middlewares/Auth.js";

const router = Router();

router.post("/create", requireSignIn
  , isAdmin, createShowroom);

router.get("/all-showrooms", getAllShowrooms);

router.post("/nearby", getNearbyShowrooms);

router.delete("/delete/:id", requireSignIn, isAdmin, deleteShowroom);

router.put("/update/:id", requireSignIn, isAdmin, updateShowroom);

router.get("/single/:id", getShowroomById);

export default router;
