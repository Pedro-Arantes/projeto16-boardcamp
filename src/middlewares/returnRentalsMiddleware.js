
import { connection } from "../database/db.js";

export async function returnValidation (req, res, next){
    const {id} = req.params;
    let feeDelay = 0;
    console.log("opa")

    try{
        

        
        const rentals= await connection.query('SELECT "rentDate", "daysRented", "returnDate","gameId" FROM rentals WHERE id=$1', [id])
        const games= await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1', [rentals.rows[0].gameId]);

        if(rentals.rowCount === 0){
            return res.sendStatus(404)
        }

        if(rentals.rows[0].returnDate !== null){
            return res.sendStatus(400);
        }
        const now = new Date ()
        const past = new Date(rentals.rows[0].rentDate); // Outra data no passado
        const diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        days = days - rentals.rows[0].daysRented;

        if(days > 0){
            feeDelay = days * games.rows[0].pricePerDay;
        }

        

    } catch (error){
        console.log(error);
        res.status(500);
    }
    req.info = {
        feeDelay, id
    };
    next()
}