import type {
  ApplicationStatus,
  EmploymentType,
  JobStatus,
  Roles,
} from "@/generated/prisma/enums.js";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
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
  id: string;
  image?: string | null;
  firstName: string;
  lastName: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationDTO {
  id: string;
  jobId: string;
  applicantId: string;
  resume: string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedJobsDTO {
  id: string;
  jobId: string;
  userId: string;
  createdAt: Date;
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
