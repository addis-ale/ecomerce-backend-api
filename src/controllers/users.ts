import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../models/users";
import { prismaClient } from "..";

import { ErrorCodes } from "../exceptions/root";
import { User } from "@prisma/client";
import { NotFoundException } from "../exceptions/notFound";

export const addAdress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  AddressSchema.parse(req.body);
  let user: User;

  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user?.id,
    },
  });
  res.status(200).json(address);
};
