const express = require("express");
const {
  createColor,
  deleteColor,
  getAllColors,
  getColorById,
  updateColor,
} = require("../controllers/Color.js");
const formidable = require("express-formidable");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createColor);

router.put("/update/:cid", requireSignIn, isAdmin, updateColor);

router.delete("/delete/:cid", requireSignIn, isAdmin, deleteColor);

router.get("/single/:cid", getColorById);

router.get("/all-colors", getAllColors);

module.exports = router;
