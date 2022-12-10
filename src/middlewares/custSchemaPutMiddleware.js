import { customerSchema } from "../models/customerModel.js";

export async function custSchemaMd(req, res, next) {
    const {cpf}=req.body
    const {id} = req.params
    const validation = customerSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        return
    }
    const cpfExist = await connection.query("SELECT * FROM customers WHERE cpf=$1 AND id<>$2", 
    [cpf, id]);

    if (cpfExist.rowCount > 0){
        return res.sendStatus(409);
    }
    next();
}