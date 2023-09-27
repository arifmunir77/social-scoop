import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asychHandler from "express-async-handler";
const protect = asychHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "login");

      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      res.status(401);

      throw new Error("No Authorized No Token");
    }
  }
});

export default protect;
