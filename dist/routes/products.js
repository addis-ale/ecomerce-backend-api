"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../errorHandler");
const products_1 = require("../controllers/products");
const auth_1 = __importDefault(require("../middleware/auth"));
const admin_1 = __importDefault(require("../middleware/admin"));
const productRoutes = (0, express_1.Router)();
productRoutes.post("/", [auth_1.default, admin_1.default], (0, errorHandler_1.errorHandler)(products_1.createProduct));
exports.default = productRoutes;
