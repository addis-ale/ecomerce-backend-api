import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user?.role === "ADMIN") {
    next();
  } else {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }
};
export default adminMiddleware;
