import { HttpException } from "./root";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: number) {
    super(message, errorCode, 404, null);
  }
}
