import { Router, Request, Response } from "express";
import { login } from "../controllers/auth";
const authRoutes: Router = Router();
authRoutes.get("/login", login);
export default authRoutes;
