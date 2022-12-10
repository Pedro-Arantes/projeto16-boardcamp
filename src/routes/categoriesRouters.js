import { Router } from "express";
import { getCategories,insertCategories } from "../controllers/categoriesController.js";
import { categorieSchemaMd } from "../middlewares/categorieSchemaMiddleware.js";
const router = Router();

router.post("/categories",categorieSchemaMd,insertCategories)
router.get("/categories",getCategories)

export default router;