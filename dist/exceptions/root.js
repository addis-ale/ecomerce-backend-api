"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.errors = errors;
        this.statusCode = statusCode;
    }
}
exports.HttpException = HttpException;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCodes[ErrorCodes["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCodes[ErrorCodes["UNPROSSABLE_ENTITY"] = 2001] = "UNPROSSABLE_ENTITY";
    ErrorCodes[ErrorCodes["INTERNAL_EXEPTION"] = 3001] = "INTERNAL_EXEPTION";
    ErrorCodes[ErrorCodes["UNAUTHORIZED"] = 4001] = "UNAUTHORIZED";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
