const express = require("express");
const formidable = require("express-formidable");
const {
  createColor,
  deleteColor,
  getAllColors,
  getColorById,
  updateColor,
} = require("../controllers/Color");
const { isAdmin, requireSignIn } = require("../middlewares/Auth");

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createColor);
router.put("/update/:cid", requireSignIn, isAdmin, updateColor);
router.delete("/delete/:cid", requireSignIn, isAdmin, deleteColor);
router.get("/single/:cid", getColorById);
router.get("/all-colors", getAllColors);

module.exports = router;
