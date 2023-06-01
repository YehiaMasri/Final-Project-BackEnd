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
router.post("/addAdmin", addAdmin)
router.delete("/:id", deleteUser);
router.get("/users", getAllUser);
router.get("/:id", getUserById);
router.get("/", getAllAdmin);
router.put("/edit/:id", updateUser);
router.get("/:id/booked_sections",   getBookedSections);
router.get("/loggedIn", isLoggedIn)
export default router;
