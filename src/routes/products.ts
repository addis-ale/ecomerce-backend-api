import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { createProduct } from "../controllers/products";
import authMiddleware from "../middleware/auth";
import adminMiddleware from "../middleware/admin";
const productRoutes: Router = Router();
productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
export default productRoutes;
