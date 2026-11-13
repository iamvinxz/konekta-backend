import type { Roles } from "@/generated/prisma/enums.js";
import type { ApiResponseDTO, UserDTO } from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";

export const getUser = async (
  req: Request<{}, {}, {}, { role: Roles }>,
  res: Response<ApiResponseDTO<UserDTO[]>>,
) => {
  try {
    const { role } = req.query;
    const users: UserDTO[] = await prisma.user.findMany({ where: { role } });

    return res.status(200).send({
      success: true,
      message: "Users found successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
