"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.AddressSchema = zod_1.z.object({
    lineOne: zod_1.z.string(),
    lineTwo: zod_1.z.string().nullable(),
    pincode: zod_1.z.string().length(6),
    country: zod_1.z.string(),
    city: zod_1.z.string(),
});
