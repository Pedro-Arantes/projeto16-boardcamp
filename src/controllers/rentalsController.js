import { connection } from "../database/db.js";
import { day } from "../server.js";
import dayjs from 'dayjs';
export async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    try {
        if (!customerId && !gameId) {
            const rentals = await connection.query('SELECT rentals.*,customers.name,games.name AS gamename,games."categoryId",categories.name AS "categoryName " FROM rentals  JOIN customers  ON customers.id ="customerId"  JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" ',)
            //console.log(rentals.rows)
            res.send(rentals.rows.map((item) => {
                const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, name, gamename, categoryName } = item
                const obj = {
                    id,
                    customerId,
                    gameId,
                    rentDate, daysRented, returnDate, originalPrice, delayFee,
                    customer: { name },
                    game: { name: gamename, categoryName }
                }
                return obj
            }
            ));
        } else if (customerId && gameId) {
            const rentals = await connection.query('SELECT rentals.*,customers.name,games.name AS gamename,games."categoryId",categories.name AS "categoryName " FROM rentals WHERE "customerId" =  $1 ,"gameId"=$2 JOIN customers  ON customers.id ="customerId"  JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" ', [customerId, gameId])
            console.log(rentals.rows)
            res.send(rentals.rows.map((item, i) => {
                const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, name, gamename, categoryName } = item
                const obj = {
                    id,
                    customerId,
                    gameId,
                    rentDate, daysRented, returnDate, originalPrice, delayFee,
                    customer: { name },
                    game: { name: gamename, categoryName }
                }
                return obj
            }
            ));
        } else if (customerId) {
            const rentals = await connection.query('SELECT rentals.*,customers.name,games.name AS gamename,games."categoryId",categories.name AS "categoryName " FROM rentals WHERE "customerId" =  $1  JOIN customers  ON customers.id ="customerId"  JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" ', [customerId])
            console.log(rentals.rows)
            res.send(rentals.rows.map((item, i) => {
                const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, name, gamename, categoryName } = item
                const obj = {
                    id,
                    customerId,
                    gameId,
                    rentDate, daysRented, returnDate, originalPrice, delayFee,
                    customer: { name },
                    game: { name: gamename, categoryName }
                }
                return obj
            }
            ));
        } else if (gameId) {
            const rentals = await connection.query('SELECT rentals.*,customers.name,games.name AS gamename,games."categoryId",categories.name AS "categoryName " FROM rentals WHERE "customerId" =  $1  JOIN customers  ON customers.id ="customerId"  JOIN games ON games.id = "gameId" JOIN categories ON categories.id = games."categoryId" ', [customerId])
            console.log(rentals.rows)
            res.send(rentals.rows.map((item, i) => {
                const { id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, name, gamename, categoryName } = item
                const obj = {
                    id,
                    customerId,
                    gameId,
                    rentDate, daysRented, returnDate, originalPrice, delayFee,
                    customer: { name },
                    game: { name: gamename, categoryName }
                }
                return obj
            }
            ));
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
        //console.log(price)
        const rentals = await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)', [customerId, gameId, day, daysRented, null, price, null])

        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function returnRental(req, res) {
    const { id } = req.params;
    let fee;
    try {
        const rental = await connection.query('SELECT  "rentDate","daysRented" ,"gameId" FROM rentals WHERE id=$1  ', [id])

        console.log(rental.rows[0])
        let { rentDate } = rental.rows[0]
        rentDate = dayjs(rentDate).format("MM-DD").split("-")
        const { daysRented, gameId } = rental.rows[0]

        const game = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId])
        //console.log(game)
        const { pricePerDay } = game.rows[0]
        //console.log( rentDate[0] )
        const dayArray = day.split("-")
        if (Number(dayArray[1]) - Number(rentDate[0]) === 0) {
            const useDays = Number(dayArray[2]) - Number(rentDate[1])
            if (useDays <= Number(daysRented)) {
                fee = null
            } else {
                const overDays = useDays - Number(daysRented)
                fee = overDays * pricePerDay;
            }
        }




        const rentals = await connection.query('UPDATE rentals SET "returnDate"=$1 ,"delayFee"=$2 WHERE id=$3  ', [day, fee, id])
        console.log(rentals)
        console.log(fee)
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