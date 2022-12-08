import { Router } from "express";
import { getCustomers,getCustomer,insertCustomer,updateCustomer } from "../controllers/customersController.js";

const router = Router();

router.get("/customers",getCustomers)
router.get("/customers/:id",getCustomer)
router.post("/customers",insertCustomer)
router.put("/customers/:id",updateCustomer)

export default router;