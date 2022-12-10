import { Router } from "express";
import {getRentals,insertRental,returnRental,deleteRental} from "../controllers/rentalsController.js";
import { rentalSchemaMd } from "../middlewares/rentalSchemaMiddleware.js";
const router = Router();

router.get("/rentals",getRentals)
router.post("/rentals",rentalSchemaMd,insertRental)
router.post("/rentals/:id/return",returnRental)
router.delete("/rentals/:id",deleteRental)


export default router;