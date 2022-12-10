import { customerSchema } from "../models/customerModel.js";

export async function customerSchemaMd(req, res, next) {
    const {cpf}=req.body
    const validation = customerSchema.validate(req.body);
    if (validation.error) {
        res.status(400)
        return
    }
    const customers= await connection.query("SELECT * FROM customers WHERE cpf=$1",[cpf]);
    if (customers.length > 0) {
        res.status(409)
        return
    }
    next();
}