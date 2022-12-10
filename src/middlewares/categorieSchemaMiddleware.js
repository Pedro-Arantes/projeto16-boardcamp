import { categorieSchema } from "../models/categorieModel.js";

export async function categorieSchemaMd(req, res, next) {
    const {name}=req.body
    const validation = categorieSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        return
    }
    const categories= await connection.query("SELECT * FROM categories WHERE name=$1",[name]);
    if (categories.length > 0) {
        res.status(409)
        return
    }
    next();
}