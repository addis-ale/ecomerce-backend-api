export class HttpException extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  errors: any;
  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.errors = errors;
    this.statusCode = statusCode;
  }
}
export enum ErrorCodes {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROSSABLE_ENTITY = 2001,
  INTERNAL_EXEPTION = 3001,
  UNAUTHORIZED = 4001,
}
