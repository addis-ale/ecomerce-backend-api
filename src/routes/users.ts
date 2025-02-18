import { Router } from "express";
import { errorHandler } from "../errorHandler";
import { addAdress, deleteAddress, listAddress } from "../controllers/users";
import authMiddleware from "../middleware/auth";
const usersRouter: Router = Router();
usersRouter.post("/address", [authMiddleware], errorHandler(addAdress));
usersRouter.delete("/:id", [authMiddleware], errorHandler(deleteAddress));
usersRouter.get("/", [authMiddleware], errorHandler(listAddress));
export default usersRouter;
