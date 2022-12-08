import { Router } from "express";
import { getCategories,insertCategories } from "../controllers/categoriesController.js";
const router = Router();

router.post("/categories",insertCategories)
router.get("/categories",getCategories)

export default router;