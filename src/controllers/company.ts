import type {
  ApiResponseDTO,
  CompanyDTO,
  CreateCompany,
  EditCompanyDTO,
} from "@/lib/global.dto.js";
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

export const createCompany = async (
  req: Request<{}, {}, CreateCompany>,
  res: Response<ApiResponseDTO<CompanyDTO>>,
) => {
  try {
    const { image, companyName, companyDescription, location, website } =
      req.body;

    const newCompany = await prisma.company.create({
      data: {
        image,
        companyName,
        companyDescription,
        location,
        website,
        employer: { connect: { id: req.user.id } },
      },
    });

    return res.status(201).send({
      success: true,
      message: "Company created successfully.",
      data: newCompany,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const deleteCompany = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponseDTO<{}>>,
) => {
  try {
    const { id } = req.params; //company id

    const company = await prisma.company.findUnique({
      where: { id, employerId: req.user.id },
    });

    if (!company) {
      return res
        .status(404)
        .send({ success: false, message: "Company not found." });
    }

    await prisma.company.delete({ where: { id } });

    return res
      .status(200)
      .send({ success: true, message: "Company deleted successfully." });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const editCompany = async (
  req: Request<{ id: string }, {}, EditCompanyDTO>,
  res: Response<ApiResponseDTO<CompanyDTO>>,
) => {
  try {
    const { id } = req.params;
    const { image, companyName, companyDescription, location, website } =
      req.body;

    const updatedCompany: CompanyDTO = await prisma.company.update({
      where: { id, employerId: req.user.id },
      data: { image, companyName, companyDescription, location, website },
    });

    return res.status(200).send({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
