import { connection } from "../database/db.js";

export async function getGames(req, res) {
    const {name} = req.query
    console.log(name)
    try {
        if (!name) {
            const games = await connection.query(`SELECT * FROM games `);
            res.send(games.rows);
        }else{
            const games = await connection.query(`SELECT * FROM games WHERE  name ILIKE '${name}%' `);
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