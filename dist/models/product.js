"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
// Define the Zod schema for product validation
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    tags: zod_1.z.array(zod_1.z.string()).min(1, "At least one tag is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
});
exports.productSchema = productSchema;
