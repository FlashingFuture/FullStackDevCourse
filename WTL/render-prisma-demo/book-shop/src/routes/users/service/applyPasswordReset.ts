import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@/utils/httpError";
import { getPrisma } from "@/database/prisma";
import { MessageResponse } from "../types/auth.types";
import { hashPassword } from "@/utils/password";

export const applyPasswordReset = async (
  email: string,
  newPassword: string
): Promise<MessageResponse> => {
  if (!email || !newPassword) {
    throw new HTTPError(StatusCodes.BAD_REQUEST, "모든 필드를 입력해주세요.");
  }

  const prisma = getPrisma();
  const { passwordHash, salt } = hashPassword(newPassword);
  try {
    const result = await prisma.user.updateMany({
      where: { email },
      data: {
        password: passwordHash,
        salt: salt,
      },
    });

    if (result.count === 0) {
      throw new HTTPError(
        StatusCodes.NOT_FOUND,
        "해당 이메일의 사용자가 존재하지 않습니다."
      );
    }

    return {
      status: StatusCodes.OK,
      message: "비밀번호 변경 완료",
    };
  } catch (err) {
    throw err;
  }
};
