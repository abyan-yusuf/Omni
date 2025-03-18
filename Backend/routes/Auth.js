const express = require("express");
const {
  changePassword,
  deleteUser,
  loginUser,
  registerUser,
  sendOTPMail,
  updateUser,
  verifyOTP,
} = require("../controllers/Auth.js");
const { isAdmin, requireSignIn } = require("../middlewares/Auth.js");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/update/:uid", updateUser);

router.delete("/delete/:uid", deleteUser);

router.post("/new-otp", sendOTPMail);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", changePassword);

router.get("/user-auth", requireSignIn, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(404).send({ error });
  }
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  try {
    res.status(200).send({ ok: true });
  } catch (error) {
    res.status(404).send({ error });
  }
});

module.exports = router;
