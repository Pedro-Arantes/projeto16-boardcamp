import { rentalSchema } from "../models/rentalModel.js";

export async function rentalSchemaMd(req, res, next) {
    const {customerId,gameId}=req.body
    const validation = rentalSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        return
    }
    const rentals1= await connection.query("SELECT * FROM customers WHERE customers.id=$1",[customerId]);
    const rentals2 = await connection.query("SELECT * FROM games WHERE game.id=$1",[gameId]);
    if (rentals1.length === 0 || rentals2 === 0) {
        res.status(400)
        return
    }
    next();
}