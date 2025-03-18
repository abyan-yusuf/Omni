const { Router } = require("express");
const { getAllDirectors, addDirector, getDirectorImage, updateDirector, deleteDirector } = require("../controllers/Directors");
const router = Router();
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");
const ExpressFormidable = require("express-formidable");

router.get("/all", getAllDirectors)
router.post("/add",requireSignIn, isAdmin, ExpressFormidable(), addDirector)
router.get("/image/:id", getDirectorImage)
router.put("/update/:id",requireSignIn, isAdmin, ExpressFormidable(), updateDirector)
router.delete("/delete/:id",requireSignIn, isAdmin, ExpressFormidable(), deleteDirector)

module.exports = router