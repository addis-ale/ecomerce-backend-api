import express from "express";
import { signup, login, me } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import authMiddleware from "../middleware/auth";

const router = express.Router();

// ✅ Wrap controllers (not middleware)
router.post("/signup", errorHandler(signup));
router.post("/login", errorHandler(login));

// ✅ Use middleware normally, then wrap controller
router.get("/me", [authMiddleware], errorHandler(me));

export default router;
