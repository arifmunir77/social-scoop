import express from "express";
import { userRegister, authUser } from "../controller/userController.js";
const router = express.Router();
// import protect from "../middleware/authMiddleware.js";

router.route("/").post(authUser);
// router.post('/login',authUser);
router.route("/register").post(userRegister);

export default router;
