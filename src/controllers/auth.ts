import bcrypt from "bcrypt";
import type {
  LoginDTO,
  ApiResponseDTO,
  RegisterDTO,
  UserDTO,
} from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "@/helper/jwt.js";
import strict from "node:assert/strict";

export const login = async (
  req: Request<{}, ApiResponseDTO<{ accessToken: string }>, LoginDTO>,
  res: Response<ApiResponseDTO<{ accessToken: string }>>,
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid emaail or password.",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password); //return boolean
    if (!validPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid email or password." });
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    generateRefreshToken({ id: user.id, role: user.role }, res);

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      data: { accessToken },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const register = async (
  req: Request<{}, {}, RegisterDTO>,
  res: Response<ApiResponseDTO<UserDTO>>,
) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(403).send({
        success: false,
        message: "Email is already in use. Please input other valid email.",
      });
    }

    const hashedPassword: string = await bcrypt.hash(password, 13);

    const newUser: UserDTO = await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName, role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    return res.status(200).send({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const logout = async (
  req: Request,
  res: Response<ApiResponseDTO<{}>>,
) => {
  try {
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

    return res
      .status(200)
      .send({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
