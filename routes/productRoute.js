import express from "express";
const router = express.Router();

// import upload from "../middleware/imagesUpload.js";

import productController from "../controllers/productController.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.js";
import upload from "../middleware/uploadImage.js";

// get All products
router.get("/", productController.getAllProducts);
// get product by category:id
router.get("/category/:categoryId", productController.getProductByCategory);
// get One Product
router.get("/:id", verifyAdmin, productController.getSingleProduct);
// get user products
// router.post("/user-product", productController.getUserProducts);
// Add one product
router.post("/create", verifyAdmin, upload, productController.addProduct);
// edit one product
router.put("/edit/:id",verifyAdmin,  productController.editProduct);
// delete one product
router.delete("/delete/:id",verifyAdmin, productController.deleteProduct);

export default router;
