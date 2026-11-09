import type { TokenPayload } from "@/helper/jwt.js";
import type { ApiResponseDTO } from "@/lib/global.dto.js";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticate = async (
  req: Request,
  res: Response<ApiResponseDTO<{}>>,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader?.split(" ")[1]; //get the token in auth header

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthenticated. Please login your credentials.",
      });
    }

    const user = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as TokenPayload;

    req.user = user; //assign the decoded token to user property
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthenticated. Token expired." });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({
        success: false,
        message: "Unauthenticated. Invalid access token.",
      });
    }

    return res.status(500).send({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
  next();
};
