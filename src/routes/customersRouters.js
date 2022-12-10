import { Router } from "express";
import { getCustomers,getCustomer,insertCustomer,updateCustomer } from "../controllers/customersController.js";
import { customerSchemaMd } from "../middlewares/customerSchemaMiddleware.js";
const router = Router();

router.get("/customers",getCustomers)
router.get("/customers/:id",getCustomer)
router.post("/customers",customerSchemaMd,insertCustomer)
router.put("/customers/:id",customerSchemaMd,updateCustomer)

export default router;