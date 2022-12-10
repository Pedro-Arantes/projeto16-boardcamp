import { connection } from "../database/db.js";
import { day } from "../server.js";
import dayjs from 'dayjs';

export async function getRentals(req, res) {
    const { customerId, gameId } = req.query
    const rentalsQuery = `
    SELECT rentals.*,
    row_to_json(customers.*)AS customer, 
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
            const rentals = await connection.query(`${rentalsQuery} WHERE "customerId" =  $1 ,"gameId"=$2 `, [customerId, gameId])
            res.send(rentals.rows);
        } else if (customerId) {
            const rentals = await connection.query(`${rentalsQuery} WHERE "customerId"=$1`, [customerId])
            res.send(rentals.rows);
        } else if (gameId) {
            const rentals = await connection.query(`${rentalsQuery} WHERE "gameId"=$1`, [customerId])
            
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
    const { id } = req.params;
    let fee;
    try {
        const rental = await connection.query('SELECT  "rentDate","daysRented" ,"gameId" ,"returnDate" FROM rentals WHERE id=$1  ', [id])
        if (rental.length === 0 ) {
            res.sendStatus(404)
            return
        }else if(rental.row[0].returnDate !== null){
            res.sendStatus(400)
            return
        }
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