import { RegisterDto, LoginDto, UserResponseDto } from "../types/auth.types";

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterDto): Promise<UserResponseDto> => {
  if (!email || !password || !name) {
    throw new Error("모든 필드를 입력해주세요.");
  }

  return {
    id: Math.floor(Math.random() * 10000),
    email,
    name,
  };
};

export const loginUser = async ({ email, password }: LoginDto) => {
  if (!email || !password) {
    throw new Error("모든 필드를 입력해주세요.");
  }
};
