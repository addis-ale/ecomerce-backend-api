"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const __1 = require("..");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const badRequest_1 = require("../exceptions/badRequest");
const root_1 = require("../exceptions/root");
const validation_1 = require("../exceptions/validation");
const users_1 = require("../models/users");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        users_1.SignUpSchema.parse(req.body);
        const { email, name, password } = req.body;
        let user = yield __1.prismaClient.user.findFirst({ where: { email } });
        if (user) {
            return next(new badRequest_1.BadRequestException("User already exist!", root_1.ErrorCodes.USER_ALREADY_EXISTS));
        }
        user = yield __1.prismaClient.user.create({
            data: {
                name,
                email,
                password: (0, bcrypt_1.hashSync)(password, 10),
            },
        });
        res.json(user);
    }
    catch (error) {
        next(new validation_1.UnprocessableEntity(error === null || error === void 0 ? void 0 : error.issues, "Unprocessable Entity", root_1.ErrorCodes.UNPROSSABLE_ENTITY));
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield __1.prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        next(new badRequest_1.BadRequestException("no user found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
    if (user && !(0, bcrypt_1.compareSync)(password, user.password)) {
        return next(new badRequest_1.BadRequestException("Invalid Credential", root_1.ErrorCodes.INCORRECT_PASSWORD));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    if (user) {
        const token = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET);
        res.json({ user, token });
    }
});
exports.login = login;
