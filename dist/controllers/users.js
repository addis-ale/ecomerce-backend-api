"use strict";
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
exports.listAddress = exports.deleteAddress = exports.addAdress = void 0;
const users_1 = require("../models/users");
const __1 = require("..");
const notFound_1 = require("../exceptions/notFound");
const root_1 = require("../exceptions/root");
const addAdress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    users_1.AddressSchema.parse(req.body);
    let user;
    const address = yield __1.prismaClient.address.create({
        data: Object.assign(Object.assign({}, req.body), { userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }),
    });
    res.status(200).json(address);
});
exports.addAdress = addAdress;
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield __1.prismaClient.address.delete({
            where: {
                id: +req.params.id,
            },
        });
        res
            .status(200)
            .json(`Addres with an id ${req.params.id} successfully deleted `);
    }
    catch (error) {
        return next(new notFound_1.NotFoundException("Product Not Found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
});
exports.deleteAddress = deleteAddress;
const listAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const addresses = yield __1.prismaClient.address.findMany({
        where: {
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    res.status(200).json(addresses);
});
exports.listAddress = listAddress;
