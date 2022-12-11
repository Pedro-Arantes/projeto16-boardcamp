import { Router } from "express";
import {getRentals,insertRental,returnRental,deleteRental} from "../controllers/rentalsController.js";
import { rentalSchemaMd } from "../middlewares/rentalSchemaMiddleware.js";
import {  returnValidation} from "../middlewares/returnRentalsMiddleware.js";
const router = Router();

router.get("/rentals",getRentals)
router.post("/rentals",rentalSchemaMd,insertRental)
router.post("/rentals/:id/return",returnValidation,returnRental)
router.delete("/rentals/:id",deleteRental)


export default router;