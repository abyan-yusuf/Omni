const JWT = require("jsonwebtoken");
const Auth = require("../models/Auth");

exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await Auth.findById(req.user._id);
    if (!user.admin) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
