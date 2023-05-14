import express from "express";
const router = express.Router();

// import upload from "../middleware/imagesUpload.js";

import productController from "../controllers/productController.js";
// import { admin, verifyUser } from "../middleware/auth.js";

// get All products
router.get("/", productController.getAllProducts);
// get product by category:id
router.get("/category/:categoryId", productController.getProductByCategory);
// get One Product
router.get("/:id", productController.getSingleProduct);
// get user products
router.post("/user-product", productController.getUserProducts);
// Add one product
router.post("/create",  productController.addProduct);
// edit one product
router.put("/edit/:id", productController.editProduct);
// delete one product
router.delete("/delete/:id", productController.deleteProduct);

export default router;
