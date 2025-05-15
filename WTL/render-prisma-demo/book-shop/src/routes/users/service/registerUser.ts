import { StatusCodes } from "http-status-codes";
import { RegisterDto, MessageResponse } from "../types/auth.types";
import { HTTPError } from "@/utils/httpError";
import { hashPassword } from "@/utils/password";
import { prisma } from "@/database/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterDto): Promise<MessageResponse> => {
  const { passwordHash, salt } = hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        salt,
      },
    });

    return {
      status: StatusCodes.CREATED,
      message: "회원가입 성공",
    };
  } catch (error: any) {
    console.error("error!!!! ", error);

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new HTTPError(StatusCodes.CONFLICT, "이미 등록된 이메일입니다.");
    }

    throw new HTTPError(StatusCodes.INTERNAL_SERVER_ERROR, "데이터베이스 오류");
  }
};
