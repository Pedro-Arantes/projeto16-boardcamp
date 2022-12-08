import { Router } from "express";
import {getRentals,insertRental,returnRental,deleteRental} from "../controllers/rentalsController.js";
const router = Router();

router.get("/rentals",getRentals)
router.post("/rentals",insertRental)
router.post("/rentals/:id/return",returnRental)
router.delete("/rentals/:id",deleteRental)


export default router;