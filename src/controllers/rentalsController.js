import { connection } from "../database/db.js";
import { day } from "../server.js";
import dayjs from 'dayjs';
export async function getRentals(req, res) {

    try {
        const rentals = await connection.query('SELECT * FROM rentals JOIN games ON rentals."gameId" = games.id  JOIN customers ON rentals."customerId" = customers.id ')
        console.log(rentals.rows)
        res.send(rentals.rows);

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
    const { id } = req.params;

    try {
        const rental = await connection.query('SELECT  "rentDate","daysRented" FROM rentals WHERE id=$1  ', [id])
        let { rentDate, daysRented } = rental.rows[0]
        rentDate = dayjs(rentDate).format("MM-DD").split("-")
        //console.log( rentDate[0] )
        const dayArray = day.split("-")
        if (Number(dayArray[1]) - Number(rentDate[0]) === 0) {
            const useDays = Number(dayArray[2]) - Number(rentDate[1])
            console.log(useDays)
        }



        const price = Number(game.rows[0].pricePerDay) * Number(daysRented);
        console.log(price)
        const rentals = await connection.query('UPDATE rentals SET "returnDate"=$1 ,"delayFee"=$2  ', [day,])

        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};