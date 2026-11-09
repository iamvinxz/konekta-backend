import type { ApiResponseDTO } from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";

export const getAllJobs = async (
  req: Request,
  res: Response<ApiResponseDTO<{}>>,
) => {
  try {
    const jobs = await prisma.job.findMany();

    return res.status(200).send({
      success: true,
      message: "Retrieved jobs successfully!",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later!",
    });
  }
};
