const express = require("express");
const {
  createShowroom,
  deleteShowroom,
  getAllShowrooms,
  getFilteredShowrooms,
  getNearbyShowrooms,
  getShowroomById,
  updateShowroom,
} = require("../controllers/Showroom.js");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.post("/create", requireSignIn, isAdmin, createShowroom);

router.get("/all-showrooms", getAllShowrooms);

router.post("/nearby", getNearbyShowrooms);

router.delete("/delete/:id", requireSignIn, isAdmin, deleteShowroom);

router.put("/update/:id", requireSignIn, isAdmin, updateShowroom);

router.get("/single/:id", getShowroomById);

router.post("/filtered-showrooms", getFilteredShowrooms);

module.exports = router;
