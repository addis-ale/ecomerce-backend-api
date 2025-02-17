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
exports.deleteProduct = exports.updateProduct = exports.createProduct = void 0;
const __1 = require("..");
const notFound_1 = require("../exceptions/notFound");
const root_1 = require("../exceptions/root");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here is the product route");
    const { name, description, tags, price } = req.body;
    console.log("the request body", name, description, tags, price);
    const product = yield __1.prismaClient.product.create({
        data: {
            name,
            description,
            tags: tags.join(","),
            price,
        },
    });
    res.status(200).json(product);
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const productId = req.params.id;
    // Find the existing product by its ID
    let updatedProduct = yield __1.prismaClient.product.findFirst({
        where: { id: +productId },
    });
    // If product not found, throw a custom not found exception
    if (!updatedProduct) {
        return next(new notFound_1.NotFoundException("Product Not Found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
    // If the tags field exists, join it into a comma-separated string
    if (product.tags) {
        product.tags = product.tags.join(",");
    }
    // Update the product in the database with the new data
    updatedProduct = yield __1.prismaClient.product.update({
        where: {
            id: +productId,
        },
        data: Object.assign({}, product),
    });
    // Respond with the updated product
    res.status(200).json(updatedProduct);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const product = yield __1.prismaClient.product.findFirst({
        where: { id: +productId },
    });
    // If the product is not found, throw a custom NotFoundException
    if (!product) {
        return next(new notFound_1.NotFoundException("Product Not Found", root_1.ErrorCodes.USER_NOT_FOUND));
    }
    // Delete the product from the database
    yield __1.prismaClient.product.delete({
        where: {
            id: +productId,
        },
    });
    // Return a success response indicating the product was deleted
    res.status(200).json({
        message: `Product with ID ${req.params.id} has been successfully deleted.`,
    });
});
exports.deleteProduct = deleteProduct;
