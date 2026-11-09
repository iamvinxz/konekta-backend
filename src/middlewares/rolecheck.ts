import type { ApiResponseDTO } from "@/lib/global.dto.js";
import type { NextFunction, Request, Response } from "express";

const employerPage = async (
  req: Request,
  res: Response<ApiResponseDTO<{}>>,
  next: NextFunction,
) => {
  try {
    const role = req.user.role;
    console.log(role);
    if (role === "employer") {
      return next();
    }
    return res
      .status(403)
      .send({ success: false, message: "This is page is for employers only." });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).send({
      success: false,
      message:
        "Sorry for the inconvenience. Something went wrong. Please try again later.",
    });
  }
};

export default employerPage;
