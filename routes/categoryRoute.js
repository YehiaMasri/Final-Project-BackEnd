import express from "express";
import {
	getAllCategory,
	addCategory,
	getCategoryById,
	updateCategoById,
	deleteCategory,
} from "../controllers/categoryController.js";
// import  verifyAdmin from "../middleware/auth.js";
// import verifyUser from "../middleware/auth.js";
import { verifyAdmin, verifyUser, verifyToken } from "../middleware/auth.js";
const router = express.Router();
// get category
router.get("/", getAllCategory);

// add category
router.post("/", verifyUser, verifyAdmin, addCategory);

// get category by id
router.get("/:categoryId", getCategoryById);

// update category by id
router.put("/:categoryId", verifyUser, verifyAdmin, updateCategoById);

//delete category
router.delete("/:categoryId", verifyUser, verifyAdmin, deleteCategory);

export default router;
