import { connection } from "../database/db.js";
import { day } from "../server.js";
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    const rentalsQuery = `
    SELECT rentals.*,
    json_build_object('id',customers.id,'name',customers.name)AS customer, 
    json_build_object(
        'id',games.id,
        'name',games.name,
        'categoryId',games."categoryId",
        'categoryName',categories.name
        )AS game 
    FROM rentals  
    JOIN customers  
    ON customers.id ="customerId"  
    JOIN games 
    ON games.id = "gameId" 
    JOIN categories 
    ON categories.id = games."categoryId" `;
    try {
        if (!customerId && !gameId) {
            const rentals = await connection.query(`${rentalsQuery}`)
            res.send(rentals.rows);
        } else if (customerId && gameId) {
            const rentals = await connection.query(`${rentalsQuery} WHERE "customerId" =  $1 AND "gameId"=$2 `, [customerId, gameId])
            res.send(rentals.rows);
        } else if (customerId && !gameId) {
            const rentals = await connection.query(`${rentalsQuery} WHERE "customerId"=$1`, [customerId])
            res.send(rentals.rows);
        } else if (gameId && !customerId) {
            const rentals = await connection.query(`${rentalsQuery} WHERE "gameId"=$1`, [gameId])
            
            res.send(rentals.rows);
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    
    try {
        const game = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId])

        const price = Number(game.rows[0].pricePerDay) * Number(daysRented);
        console.log(price)
        const rentals = await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)', [customerId, gameId, day, daysRented, null, price, null])

        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function returnRental(req, res) {
    const { id,feeDelay } = req.info;
    
    try {
        const rentals = await connection.query('UPDATE rentals SET "returnDate"=$1 ,"delayFee"=$2 WHERE id=$3  ', [day, feeDelay, id])
        res.sendStatus(201);
        return
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const rent = await connection.query('SELECT  "returnDate"  FROM rentals WHERE id=$1 ', [id])
        if (rent.length === 0 ) {
            res.sendStatus(404)
        }

        if (rent.rows[0].returnDate !== null) {
            const del = await connection.query("DELETE FROM rentals WHERE id=$1", [id])
            res.sendStatus(200)

        } else {
            res.sendStatus(400)
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

}
