import express from "express";
import {
  userRegister,
  authUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
} from "../controller/userController.js";
const router = express.Router();
// import protect from "../middleware/authMiddleware.js";

router.route("/").post(authUser);
// router.post('/login',authUser);
router.route("/register").post(userRegister);
router.route("/all-user").get(getAllUser);
router.route("/user/:id").get(getUserById);
router.route("/user/:id").delete(deleteUser);
router.route("/user/:id").put(updateUser);

export default router;
