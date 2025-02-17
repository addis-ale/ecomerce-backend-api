import { z } from "zod";

// Define the Zod schema for product validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  price: z.number().positive("Price must be a positive number"),
});

export { productSchema };
