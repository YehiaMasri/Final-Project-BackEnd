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
import upload from "../middleware/uploadImage.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);
router.post("/addroom",upload, createRoom);
router.post("/book", bookSection);
router.put("/:id", editRoom);
router.delete("/:id", deleteRoom);

export default router;
