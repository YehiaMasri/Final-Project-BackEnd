import express from "express";
import {
  bookSection,
  createRoom,
  deleteRoom,
  editRoom,
  getRoomById,
  getRooms,
} from "../controllers/entertainmentController.js";
import { admin, verifyToken, verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/addroom",verifyToken, admin, createRoom);
router.post("/book", verifyUser, bookSection);
router.put("/:id",verifyToken, admin, editRoom);
router.delete("/:id",verifyToken, admin, deleteRoom);

export default router;
