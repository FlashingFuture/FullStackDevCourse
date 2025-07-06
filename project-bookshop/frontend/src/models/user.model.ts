export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  id: number;
  email?: string;
  password?: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface UserResponseDto {
  id: number;
  email: string;
  name: string;
}

export interface MessageResponse {
  status: number;
  message: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  token: string;
}
