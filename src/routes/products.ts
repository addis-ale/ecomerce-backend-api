import { Router } from "express";
import { errorHandler } from "../errorHandler";
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../controllers/products";
import authMiddleware from "../middleware/auth";
import adminMiddleware from "../middleware/admin";
const productRoutes: Router = Router();
productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
productRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);
productRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);
productRoutes.get("/", [authMiddleware, adminMiddleware], listProducts);
export default productRoutes;
