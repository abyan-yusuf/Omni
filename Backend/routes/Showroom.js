import { Router } from "express";
import {
  createShowroom,
  deleteShowroom,
  getAllShowrooms,
  getShowroomById,
  updateShowroom,
} from "../controllers/Showroom.js";

const router = Router();

router.post("/create", createShowroom);

router.get("/all-showrooms", getAllShowrooms);

router.get("/single/:id", getShowroomById);

router.delete("/delete/:id", deleteShowroom);

router.put("/update/:id", updateShowroom);

export default router;
