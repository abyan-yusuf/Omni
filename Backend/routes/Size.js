import { Router } from "express";
import { getAllSizes, getSizeById, updateSize, createSize, deleteSize } from "../controllers/Size.js";

const router = Router()

router.get("/all-sizes", getAllSizes)

router.get("/single/:sid", getSizeById)

router.put("/update/:sid", updateSize)

router.post("/create", createSize)

router.delete("/delete/:sid", deleteSize)

export default router