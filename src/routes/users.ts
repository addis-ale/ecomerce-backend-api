import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { addAdress } from "../controllers/users";
import authMiddleware from "../middleware/auth";
const usersRouter: Router = Router();
usersRouter.post("/address", [authMiddleware], errorHandler(addAdress));
export default usersRouter;
