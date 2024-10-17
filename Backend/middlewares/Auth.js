import JWT from "jsonwebtoken";
import Auth from "../models/Auth.js";

export const requireSignIn = async (req, res, next) => {
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

export const isAdmin = async (req, res, next) => {
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
