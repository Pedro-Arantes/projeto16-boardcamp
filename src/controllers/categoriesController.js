import { connection } from "../database/db.js";

export  async function getCategories  (req, res) {
    
    try {
      const categories= await connection.query("SELECT * FROM categories");
      res.send(categories.rows);
    } catch (error) {
      
    } 
};
export  async  function insertCategories (req, res) {
    const {name } = req.body;
    try {
      const categories= await connection.query("INSERT INTO categories (name)  VALUES  ($1)",[name]);
      res.sendStatus(201);
    } catch (error) {
      
    } 
  };