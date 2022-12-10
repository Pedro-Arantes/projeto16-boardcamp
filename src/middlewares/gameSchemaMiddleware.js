import { gameSchema } from "../models/gameModel.js";
import { connection } from "../database/db.js";

export async function gameSchemaMd(req, res, next) {
    const {name}=req.body
    const validation = gameSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        console.log(validation.error)
        return
    }
    const games= await connection.query("SELECT * FROM games WHERE name=$1",[name]);
    if (games.length > 0) {
        res.status(409)
        return
    }
    next();
}