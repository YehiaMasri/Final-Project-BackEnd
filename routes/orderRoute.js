import express from 'express';
import {
	getAllOrders,
	createOrder,
	getOrderById,
	updateOrder,
	deleteOrder,
} from '../controllers/orderController.js';
import { admin, verifyUser, verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /orders
router.get('/order', getAllOrders);

// POST /orders
router.post('/', createOrder);

// GET /orders/:orderId
router.get('/:orderId', getOrderById);

// PUT /orders/:orderId
router.put('/:orderId',verifyUser, verifyToken, admin, updateOrder);

// DELETE /orders/:orderId
router.delete('/:orderId',verifyToken, admin, deleteOrder);

export default router;
