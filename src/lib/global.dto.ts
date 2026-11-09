import type {
  EmploymentType,
  JobStatus,
  Roles,
} from "@/generated/prisma/enums.js";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Roles;
}

export interface ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UserDTO {
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
}

export interface JobDTO {
  id: string;
  companyId: string;
  jobPosition: string;
  jobDescription: string | null;
  minSalary: number | null;
  maxSalary: number | null;
  employmentType: EmploymentType;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}
