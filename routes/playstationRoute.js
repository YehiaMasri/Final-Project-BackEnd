import {
    GetAllGame,
    deleteGame,
    addGame,
    // deleteAllGame
} from "../controllers/playstationController.js";
import express from "express"
const router = express.Router();

//get 
router.get("/", GetAllGame);

// post
router.post("/", addGame);

//delete
router.delete("/:id", deleteGame);

// router.delete("/delete-all", deleteAllGame);

export default router;