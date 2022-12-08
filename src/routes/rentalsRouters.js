import { Router } from "express";
import {getRentals,insertRental,returnRental} from "../controllers/rentalsController.js";
const router = Router();

router.get("/rentals",getRentals)
router.post("/rentals",insertRental)
router.post("/rentals/:id/return",returnRental)


export default router;