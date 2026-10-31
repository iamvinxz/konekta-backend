import bcrypt from "bcrypt";
import type { LoginDto, ApiResponseDTO } from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "@/helper/jwt.js";

export const login = async (
  req: Request<{}, ApiResponseDTO<{ accessToken: string }>, LoginDto>,
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

    const accessToken = generateAccessToken({ id: user.id, role: user.roles });
    generateRefreshToken({ id: user.id, role: user.roles }, res);

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
