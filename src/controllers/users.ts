import { NextFunction, Request, Response } from "express";
import { AddressSchema } from "../models/users";
import { prismaClient } from "..";
import { User } from "@prisma/client";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";
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
export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res
      .status(200)
      .json(`Addres with an id ${req.params.id} successfully deleted `);
  } catch (error) {
    return next(
      new NotFoundException("Product Not Found", ErrorCodes.USER_NOT_FOUND)
    );
  }
};
export const listAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  res.status(200).json(addresses);
};
