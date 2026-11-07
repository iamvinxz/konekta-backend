import type { Roles } from "@/generated/prisma/enums.js";

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
