import { prismaClient } from "..";
import { Request, Response } from "express";
export const createProduct = async (req: Request, res: Response) => {
  console.log("here is the product route");
  const { name, description, tags, price } = req.body;
  console.log("the request body", name, description, tags, price);
  const product = await prismaClient.product.create({
    data: {
      name,
      description,
      tags: tags.join(","),
      price,
    },
  });
  res.status(200).json(product);
};
