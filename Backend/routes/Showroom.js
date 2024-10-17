import { Router } from "express";
import {
  createShowroom,
  deleteShowroom,
  getAllShowrooms,
  getNearbyShowrooms,
  updateShowroom,
} from "../controllers/Showroom.js";

const router = Router();

router.post("/create", createShowroom);

router.get("/all-showrooms", getAllShowrooms);

router.post("/nearby", getNearbyShowrooms);

router.delete("/delete/:id", deleteShowroom);

router.put("/update/:id", updateShowroom);

export default router;
