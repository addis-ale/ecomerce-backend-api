// src/types/custom.d.ts
import { User } from "@prisma/client";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Extend the Request interface with `user`
    }
  }
}
