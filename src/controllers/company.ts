import type { ApiResponseDTO, CompanyDTO } from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";

export const getCompanies = async (
  req: Request,
  res: Response<ApiResponseDTO<CompanyDTO[]>>,
) => {
  try {
    const companies: CompanyDTO[] = await prisma.company.findMany();

    return res.status(200).send({
      success: true,
      message: "Companies found successfully.",
      data: companies,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
