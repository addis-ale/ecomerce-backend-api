"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const errorHandler_1 = require("../errorHandler");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", (0, errorHandler_1.errorHandler)(auth_1.signup));
authRoutes.post("/login", (0, errorHandler_1.errorHandler)(auth_1.login));
exports.default = authRoutes;
