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
