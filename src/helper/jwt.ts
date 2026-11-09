import type { Roles } from "@/generated/prisma/enums.js";
import "dotenv/config";
import type { Response } from "express";
import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: string;
  role: Roles;
}

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15s",
  });
};

export const generateRefreshToken = (payload: TokenPayload, res: Response) => {
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "5d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });
};
