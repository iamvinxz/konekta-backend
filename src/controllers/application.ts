import { ApplicationStatus } from "@/generated/prisma/enums.js";
import type {
  ApiResponseDTO,
  ApplicationBodyDTO,
  ApplicationDTO,
  JobDTO,
} from "@/lib/global.dto.js";
import { prisma } from "@/lib/prisma.js";
import type { Request, Response } from "express";

export const getApplications = async (
  req: Request<{}, {}, {}, { status: ApplicationStatus }>,
  res: Response<ApiResponseDTO<ApplicationDTO[]>>,
) => {
  try {
    const { status } = req.query;

    const applications: ApplicationDTO[] = await prisma.application.findMany({
      where: { applicantId: req.user.id, status },
    });

    if (applications.length === 0) {
      return res
        .status(200)
        .send({ success: false, message: "No application found." });
    }

    return res.status(200).send({
      success: true,
      message: "Applications found successfully.",
      data: applications,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Somethign went wrong. Please try again later.",
    });
  }
};

export const createApplication = async (
  req: Request<{ jobId: string }, {}, ApplicationBodyDTO>,
  res: Response<ApiResponseDTO<{}>>,
) => {
  try {
    const { jobId } = req.params;
    const { resume, coverLetter } = req.body;

    if (!jobId) {
      return res.status(400).send({
        success: false,
        message: "Job ID is required.",
      });
    }

    const job: JobDTO | null = await prisma.job.findUnique({
      where: { id: jobId },
    });

    console.log("Params:", req.params);
    console.log("Job ID:", req.params.jobId);
    if (!job) {
      return res
        .status(404)
        .send({ success: false, message: "Job not found." });
    }

    const applicationExisted = await prisma.application.findUnique({
      where: { jobId_applicantId: { jobId, applicantId: req.user.id } },
    });

    if (applicationExisted) {
      return res.status(403).send({
        success: false,
        message: "You've applied already on this job.",
      });
    }

    if (!resume) {
      return res
        .status(404)
        .send({ success: false, message: "Please attach your updated resume" });
    }

    const application: ApplicationBodyDTO = await prisma.application.create({
      data: {
        jobId,
        applicantId: req.user.id,
        resume,
        coverLetter,
        status: "pending",
      },
    });

    return res.status(200).send({
      success: true,
      message: "Application created successfully.",
      data: application,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};
