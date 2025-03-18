const express = require("express");
const {
  getAllSizes,
  getSizeById,
  updateSize,
  createSize,
  deleteSize,
} = require("../controllers/Size.js");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.get("/all-sizes", getAllSizes);

router.get("/single/:sid", getSizeById);

router.put("/update/:sid", requireSignIn, isAdmin, updateSize);

router.post("/create", requireSignIn, isAdmin, createSize);

router.delete("/delete/:sid", requireSignIn, isAdmin, deleteSize);

module.exports = router;
