import { connection } from "../database/db.js";

export async function getGames(req, res) {
    const nameQ = req.query.name
    try {
        if (!nameQ) {
            const games = await connection.query(`SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON  categories.id = "categoryId" `);
            res.send(games.rows);
        }else{
            const games = await connection.query(`SELECT games.*,categories.name AS "categoryName" FROM games  JOIN categories ON categories.id = "categoryId" WHERE  (games.name) ILIKE '${nameQ}%'  ;`);
            res.send(games.rows);
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function insertGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        const games = await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)', [name, image, stockTotal, categoryId, pricePerDay])
        console.log(games)
        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};