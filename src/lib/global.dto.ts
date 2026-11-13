import type {
  EmploymentType,
  JobStatus,
  Roles,
} from "@/generated/prisma/enums.js";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends UserDTO {
  password: string;
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

export interface JobDTO extends CreateJobDTO {
  id: string;
  companyId: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobDTO {
  jobPosition: string;
  jobDescription: string | null;
  maxSalary: number | null;
  minSalary: number | null;
  employmentType: EmploymentType;
}

export interface JobQueryParams {
  status: JobStatus;
  employmentType: EmploymentType;
}

export interface CreateCompany {
  image: string | null;
  companyName: string;
  companyDescription: string | null;
  location: string;
  website: string | null;
}

export interface CompanyDTO extends CreateCompany {
  id: string;
  employerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EditJobDTO = CreateJobDTO;
export type EditCompanyDTO = CreateCompany;
