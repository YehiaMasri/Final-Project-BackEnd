import express from "express";
import {
  getAllCategory,
  addCategory,
  getCategoryById,
  updateCategoById,
  deleteCategory,
} from "../controllers/categoryController.js";
import { admin, superAdmin} from "../middleware/auth.js";
import verifyUser from "../middleware/auth.js";

const router = express.Router();
// get category
router.get("/", getAllCategory);

// add category
router.post("/", verifyUser, admin, addCategory);

// get category by id
router.get("/:categoryId", getCategoryById);

// update category by id
router.put("/:categoryId", verifyUser, admin, updateCategoById);

//delete category
router.delete("/:categoryId", verifyUser, admin, deleteCategory);

export default router;
