import type {
  ApiResponseDTO,
  CreateJobDTO,
  JobDTO,
  EditJobDTO,
} from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";

export const getAllJobs = async (
  req: Request,
  res: Response<ApiResponseDTO<JobDTO[]>>,
) => {
  try {
    const jobs: JobDTO[] = await prisma.job.findMany();

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

export const getJobsPerCompany = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponseDTO<JobDTO[]>>,
) => {
  try {
    const { id } = req.params;

    const jobs: JobDTO[] = await prisma.job.findMany({
      where: { companyId: id },
    });

    return res.status(200).send({
      success: true,
      message: "Job retrieves successfully",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Someting went wrong. Please try again later.",
    });
  }
};

export const getJobById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponseDTO<JobDTO>>,
) => {
  try {
    const { id } = req.params;

    const job: JobDTO | null = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return res
        .status(404)
        .send({ success: false, message: "Job not found." });
    }

    return res.status(200).send({
      success: true,
      message: "Job found successfully.",
      data: job,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const createJob = async (
  req: Request<{}, {}, CreateJobDTO>,
  res: Response<ApiResponseDTO<JobDTO>>,
) => {
  try {
    const {
      jobPosition,
      jobDescription,
      minSalary,
      maxSalary,
      employmentType,
    } = req.body;

    const employerId = req.user.id;
    const company = await prisma.company.findUnique({ where: { employerId } });

    if (!company) {
      return res
        .status(404)
        .send({ success: false, message: "Company profile not found." });
    }

    const job: JobDTO = await prisma.job.create({
      data: {
        companyId: company.id,
        jobPosition,
        jobDescription,
        maxSalary,
        minSalary,
        employmentType,
        status: "open",
      },
    });

    return res.status(201).send({
      success: true,
      message: "Job created successfully.",
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponseDTO<{}>>,
) => {
  try {
    const { id } = req.params;
    const employerId = req.user.id;

    //retrieve the job and its related company data
    const job = await prisma.job.findUnique({
      where: { id },
      include: { company: { select: { employerId: true } } },
    });

    if (!job) {
      return res
        .status(404)
        .send({ success: false, message: "Job not found." });
    }

    if (job.company.employerId !== employerId) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to delete this job.",
      });
    }

    await prisma.job.delete({ where: { id } });

    return res
      .status(200)
      .send({ success: true, message: "Job deleted successfully." });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export const editJob = async (
  req: Request<{ id: string }, {}, EditJobDTO>,
  res: Response<ApiResponseDTO<JobDTO>>,
) => {
  try {
    const { id } = req.params;
    const {
      jobPosition,
      jobDescription,
      minSalary,
      maxSalary,
      employmentType,
    } = req.body;

    const updatedJob: JobDTO = await prisma.job.update({
      where: { id },
      data: {
        jobPosition,
        jobDescription,
        minSalary,
        maxSalary,
        employmentType,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
