import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequestException } from "../exceptions/badRequest";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";
import { SignUpSchema } from "../models/users";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);

  const { email, name, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    return next(
      new BadRequestException(
        "User already exists!",
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

  res.status(200).json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    return next(
      new NotFoundException("User not found", ErrorCodes.USER_NOT_FOUND)
    );
  }

  if (!compareSync(password, user.password)) {
    return next(
      new BadRequestException(
        "Invalid Credentials",
        ErrorCodes.INCORRECT_PASSWORD
      )
    );
  }

  if (!process.env.JWT_SECRET) {
    return next(new Error("JWT_SECRET is not defined"));
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.status(200).json({ user, token });
};
export const me = async (req: Request, res: Response) => {
  res.json(req.user);
};
