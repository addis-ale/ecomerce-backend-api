"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const errorHandler_1 = require("../errorHandler");
const auth_2 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// ✅ Wrap controllers (not middleware)
router.post("/signup", (0, errorHandler_1.errorHandler)(auth_1.signup));
router.post("/login", (0, errorHandler_1.errorHandler)(auth_1.login));
// ✅ Use middleware normally, then wrap controller
router.get("/me", [auth_2.default], (0, errorHandler_1.errorHandler)(auth_1.me));
exports.default = router;
