import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCodes } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { prismaClient } from "..";
import { User } from "@prisma/client";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }

  try {
    if (!process.env.JWT_SECRET) {
      return next(new Error("JWT_SECRET is not defined"));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    const user = await prismaClient.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return next(
        new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
      );
    }

    req.user = user as User; // ✅ Attach user object
    next(); // ✅ Move to the next middleware
  } catch (error) {
    return next(
      new UnauthorizedException("Unauthorized", ErrorCodes.UNAUTHORIZED)
    );
  }
};

export default authMiddleware;
