import { connection } from "../database/db.js";


export async function getCustomers(req, res) {

    try {
        const customers = await connection.query("SELECT * FROM customers")
        //console.log(customers)
        res.send(customers.rows);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};

export async function getCustomer(req, res) {
    const { id } = req.params
    const {cpf} = req.query
    try {
        if (!cpf) {
            const customers = await connection.query("SELECT * FROM customers WHERE id=$1", [id])
            console.log(customers.rows)
            res.send(customers.rows[0]);
        }else{
            const customers = await connection.query(`SELECT * FROM customers WHERE  ILIKE cpf= '${cpf}%'`)
            console.log(customers.rows)
            res.send(customers.rows[0]);
        }
        

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};


export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const customers = await connection.query("INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)", [name, phone, cpf, birthday])

        res.send(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};


export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    try {
        const customers = await connection.query("UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5", [name, phone, cpf, birthday, id])

        res.send(200);

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
};