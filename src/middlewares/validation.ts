import type {
  ApiResponseDTO,
  CreateCompany,
  CreateJobDTO,
} from "@/lib/global.dto.js";
import type { NextFunction, Request, Response } from "express";

export const validateCompany = async (
  req: Request<{}, {}, CreateCompany>,
  res: Response<ApiResponseDTO<{}>>,
  next: NextFunction,
) => {
  try {
    const { companyDescription, companyName, location } = req.body;

    if (!companyName) {
      return res
        .status(400)
        .send({ success: false, message: "Please input the company name." });
    }

    if (!companyDescription) {
      return res.status(400).send({
        success: false,
        message: "Please provide a short description about the company.",
      });
    }

    if (!location) {
      return res.status(400).send({
        success: false,
        message: "Please input the location of the company.",
      });
    }

    next();
  } catch (error) {}
};

export const validateJob = async (
  req: Request<{}, {}, CreateJobDTO>,
  res: Response<ApiResponseDTO<{}>>,
  next: NextFunction,
) => {
  try {
    const { jobPosition, jobDescription, employmentType } = req.body;

    if (!jobPosition) {
      return res.status(400).send({
        success: false,
        message: "Please provide the position for this job",
      });
    }

    if (!employmentType) {
      return res.status(400).send({
        success: false,
        message: "Please specify what type of employment the job is.",
      });
    }

    if (!jobDescription) {
      return res.status(400).send({
        success: false,
        message: "Please provide a short description about the job",
      });
    }
    next();
  } catch (error) {}
};
