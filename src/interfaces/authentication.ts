export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
}

export interface UserRequestDto {
  username: string;
  password: string;
  role: string;
  subscription: string;
}

export interface UserResponseDto {
  username: string;
  role: string;
  subscription: string;
}
