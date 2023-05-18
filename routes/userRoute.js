import express from "express";
import {
  login,
  register,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  logout,
  getBookedSections,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/:id", verifyUser, verifyAdmin, deleteUser);
router.get("/", getAllUser);
router.get("/:id", verifyUser, verifyAdmin, getUserById);
router.put("/:id", verifyUser, verifyAdmin, updateUser);
router.get("/:id/booked_sections",  verifyUser, getBookedSections);

export default router;
