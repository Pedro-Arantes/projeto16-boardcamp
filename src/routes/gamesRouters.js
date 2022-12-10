import { Router } from "express";
import {getGames,insertGames } from "../controllers/gamesController.js";
import {  gameSchemaMd} from "../middlewares/gameSchemaMiddleware.js";
const router = Router();

router.post("/games",gameSchemaMd,insertGames)
router.get("/games",getGames)

export default router;