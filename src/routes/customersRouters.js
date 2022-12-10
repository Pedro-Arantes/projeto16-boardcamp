import { Router } from "express";
import { getCustomers,getCustomer,insertCustomer,updateCustomer } from "../controllers/customersController.js";
import { customerSchemaMd } from "../middlewares/customerSchemaMiddleware.js";
import { custSchemaMd } from "../middlewares/custSchemaPutMiddleware.js";
const router = Router();

router.get("/customers",getCustomers)
router.get("/customers/:id",getCustomer)
router.post("/customers",customerSchemaMd,insertCustomer)
router.put("/customers/:id",custSchemaMd,updateCustomer)

export default router;