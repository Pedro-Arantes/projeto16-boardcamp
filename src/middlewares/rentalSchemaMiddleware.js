import { rentalSchema } from "../models/rentalModel.js";
import { connection } from "../database/db.js";

export async function rentalSchemaMd(req, res, next) {
    const {customerId,gameId,daysRented}=req.body
    const validation = rentalSchema.validate(req.body);
    if (validation.error || Number(daysRented) <=0) {
        console.log(validation.error)
        res.sendStatus(400)
        return
    }
    const rentals1= await connection.query("SELECT * FROM customers WHERE customers.id=$1",[customerId]);
    const rentals2 = await connection.query("SELECT * FROM games WHERE games.id=$1",[gameId]);
    const rentGames = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1',[gameId]);
    
    const {stockTotal} = rentals2.rows[0]
    if (rentGames.length >= stockTotal) {
        res.sendStatus(400)
    }
    if (rentals1.length === 0 || rentals2 === 0) {
        res.sendStatus(400)
        return
    }
    next();
}