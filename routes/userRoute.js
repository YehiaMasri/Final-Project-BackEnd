import express from "express";
import {
  login,
  register,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
  logout,
  addAdmin,
  isLoggedIn,
  getAllAdmin,
  getBookedSections,
} from "../controllers/userController.js";
import { admin, verifyToken, verifyUser } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addAdmin",verifyToken,admin, addAdmin)
router.delete("/:id", verifyToken, admin,verifyUser, deleteUser);
router.get("/users",verifyToken,verifyToken,  admin,  getAllUser);
router.get("/:id", verifyUser,verifyToken, admin, getUserById);
router.get("/", verifyToken, admin, getAllAdmin);
router.put("/edit/:id", verifyUser,verifyToken,  admin, updateUser);
router.get("/:id/booked_sections",  verifyUser, getBookedSections);
router.get("/loggedIn",verifyToken, admin, isLoggedIn)
export default router;
