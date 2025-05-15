import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@/utils/httpError";
import { LoginDto, LoginResponse } from "../types/auth.types";
import { signToken } from "@/utils/token";
import { getPrisma } from "@/database/prisma";
import { verifyPassword } from "@/utils/password";

export const loginUser = async ({
  email,
  password,
}: LoginDto): Promise<LoginResponse> => {
  if (!email || !password) {
    throw new HTTPError(StatusCodes.BAD_REQUEST, "모든 필드를 입력해주세요.");
  }

  const prisma = getPrisma();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !verifyPassword(password, user.salt, user.password)) {
    throw new HTTPError(
      StatusCodes.UNAUTHORIZED,
      "로그인 정보가 잘못되었습니다. 아이디나 비밀번호를 확인해주세요."
    );
  }

  const token = signToken(user.email);

  return {
    status: StatusCodes.OK,
    message: "로그인 성공",
    token,
  };
};
