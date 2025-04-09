export interface AuthRequest {
  username: string;
  password: string;
}

export interface SignupResponse {
  message: string;
  access: string;
  refresh: string;
}

export interface LoginResponse {
  message: string;
}
