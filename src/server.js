import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';
import  categoriesRouters from "./routes/categoriesRouters.js";
import  gamesRouters from "./routes/gamesRouters.js";
import  customersRouters from "./routes/customersRouters.js";
import  rentalsRouters from "./routes/rentalsRouters.js";

const app = express();
app.use(cors());
app.use(express.json());

export const day= dayjs().format("YYYY-MM-DD")
console.log(day)

app.use(categoriesRouters);
app.use(gamesRouters);
app.use(customersRouters);
app.use(rentalsRouters)
  
app.listen(4000, () => {
    console.log('Running on http://localhost:4000')
});