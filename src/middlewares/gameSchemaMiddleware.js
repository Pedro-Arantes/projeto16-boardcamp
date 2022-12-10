import { gameSchema } from "../models/customerModel.js";

export async function customerSchemaMd(req, res, next) {
    const {name}=req.body
    const validation = gameSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        return
    }
    const games= await connection.query("SELECT * FROM customers WHERE name=$1",[name]);
    if (games.length > 0) {
        res.status(409)
        return
    }
    next();
}