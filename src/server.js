import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const { Pool } = pkg;
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  app.get("/categories", async (req, res) => {
    
    try {
      const categories= await connection.query("SELECT * FROM categories");
      res.send(categories.rows);
    } catch (error) {
      
    } 
  });
  app.post("/categories", async (req, res) => {
    const {name } = req.body;
    try {
      const categories= await connection.query("INSERT INTO categories (name)  VALUES  ($1)",[name]);
      res.sendStatus(201);
    } catch (error) {
      
    } 
  });

  app.get("/games", async (req, res) => {
    
    try {
      const games= await connection.query("SELECT * FROM games");
      res.send(games.rows);
    } catch (error) {
      
    } 
  });

  app.post("/games", async (req, res) => {
    const {name,image,stockTotal,categoryId,pricePerDay } = req.body;
    try {
      const games  = await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)',[name,image,stockTotal,categoryId,pricePerDay])
      console.log(games)
      res.sendStatus(201);
      
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    } 
  });

  app.get("/customers", async (req, res) => {
    
    try {
      const customers  = await connection.query("SELECT * FROM customers")
      console.log(customers)
      res.send(customers.rows);
      
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    } 
  });
  app.post("/customers", async (req, res) => {
    const {name,phone,cpf,birthday } = req.body;
    try {
      const customers  = await connection.query("INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)",[name,phone,cpf,birthday])
      
      res.send(201);
      
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    } 
  });
  app.put("/customers/:id", async (req, res) => {
    const {name,phone,cpf,birthday } = req.body;
    const {id} = req.params;
    try {
      const customers  = await connection.query("UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5",[name,phone,cpf,birthday,id])
      
      res.send(200);
      
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    } 
  });
app.listen(4000, () => {
    console.log('Running on http://localhost:4000')
});