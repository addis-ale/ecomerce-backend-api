"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", auth_1.signup);
authRoutes.post("/login", auth_1.login);
exports.default = authRoutes;
