import express from "express";
import {getAllMessages, addNewMessage, deleteMessage} from "../controllers/messageController.js";

import {  verifyToken, admin } from "../middleware/auth.js";

const router = express.Router();

// get kel el message 

router.get("/", getAllMessages);

// add el message

router.post("/", addNewMessage);

router.delete("/:id", deleteMessage);

export default router;





