import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCodes } from "../exceptions/root";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestException(
        "User already exist!",
        ErrorCodes.USER_ALREADY_EXISTS
      )
    );
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    next(new BadRequestException("no user found", ErrorCodes.USER_NOT_FOUND));
  }

  if (user && !compareSync(password, user.password)) {
    next(
      new BadRequestException(
        "Invalid Credential",
        ErrorCodes.INCORRECT_PASSWORD
      )
    );
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  if (user) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET
    );

    res.json({ user, token });
  }
};
