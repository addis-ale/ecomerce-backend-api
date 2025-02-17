import { prismaClient } from "..";
import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../exceptions/notFound";
import { ErrorCodes } from "../exceptions/root";
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

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  const productId = req.params.id;

  // Find the existing product by its ID
  let updatedProduct = await prismaClient.product.findFirst({
    where: { id: +productId },
  });

  // If product not found, throw a custom not found exception
  if (!updatedProduct) {
    return next(
      new NotFoundException("Product Not Found", ErrorCodes.USER_NOT_FOUND)
    );
  }

  // If the tags field exists, join it into a comma-separated string
  if (product.tags) {
    product.tags = product.tags.join(",");
  }

  // Update the product in the database with the new data
  updatedProduct = await prismaClient.product.update({
    where: {
      id: +productId,
    },
    data: {
      // Only update the fields that were provided in the request body
      ...product,
    },
  });

  // Respond with the updated product
  res.status(200).json(updatedProduct);
};
