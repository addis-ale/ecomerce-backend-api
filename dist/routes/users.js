"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errorHandler_1 = require("../errorHandler");
const users_1 = require("../controllers/users");
const auth_1 = __importDefault(require("../middleware/auth"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/address", [auth_1.default], (0, errorHandler_1.errorHandler)(users_1.addAdress));
usersRouter.delete("/:id", [auth_1.default], (0, errorHandler_1.errorHandler)(users_1.deleteAddress));
usersRouter.get("/", [auth_1.default], (0, errorHandler_1.errorHandler)(users_1.listAddress));
exports.default = usersRouter;
