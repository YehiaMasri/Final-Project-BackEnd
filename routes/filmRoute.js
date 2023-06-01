import express from "express";
import {
    getAllFilm,
    addFilm,
    deleteFilm
} from "../controllers/filmController.js";
import { verifyToken, admin } from "../middleware/auth.js";
const router = express.Router();

// get film 
router.get('/', getAllFilm);

//add film 
router.post('/',verifyToken, admin, addFilm);

//delete film 
router.delete('/:id',verifyToken,admin, deleteFilm);

export default router;