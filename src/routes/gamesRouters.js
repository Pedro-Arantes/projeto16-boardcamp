import { Router } from "express";
import {getGames,insertGames } from "../controllers/gamesController.js";
const router = Router();

router.post("/games",insertGames)
router.get("/games",getGames)

export default router;