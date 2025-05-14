import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@/utils/httpError";
import { connection } from "@/database/mariadb";
import { MessageResponse } from "../types/auth.types";

export const requestPasswordReset = async (
  email: string
): Promise<MessageResponse> => {
  if (!email) {
    throw new HTTPError(StatusCodes.BAD_REQUEST, "모든 필드를 입력해주세요.");
  }

  const conn = await connection.getConnection();

  try {
    const [rows]: any = await conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      throw new HTTPError(StatusCodes.NOT_FOUND, "사용자가 존재하지 않습니다.");
    }
    return {
      status: StatusCodes.OK,
      message: "패스워드 초기화 메일이 전송되었습니다.",
    };
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
