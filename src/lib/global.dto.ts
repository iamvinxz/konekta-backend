export interface LoginDto {
  email: string;
  password: string;
}

export interface ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data?: T;
}
