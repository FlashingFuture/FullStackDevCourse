import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@/utils/httpError";
import { MessageResponse } from "../types/auth.types";
import { prisma } from "@/database/prisma";

export const requestPasswordReset = async (
  email: string
): Promise<MessageResponse> => {
  if (!email) {
    throw new HTTPError(StatusCodes.BAD_REQUEST, "모든 필드를 입력해주세요.");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new HTTPError(StatusCodes.NOT_FOUND, "사용자가 존재하지 않습니다.");
  }

  // 실제 메일 전송 로직이 생기면 여기서 호출
  return {
    status: StatusCodes.OK,
    message: "패스워드 초기화 메일이 전송되었습니다.",
  };
};
