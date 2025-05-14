import { StatusCodes } from "http-status-codes";
import { RegisterDto, MessageResponse } from "../types/auth.types";
import { connection } from "@/database/mariadb";
import { HTTPError } from "@/utils/httpError";
import { hashPassword } from "@/utils/password";

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterDto): Promise<MessageResponse> => {
  const { passwordHash, salt } = hashPassword(password);

  const sql =
    "INSERT INTO users (email, password, name, salt) VALUES (?, ?, ?, ?)";
  const values = [email, passwordHash, name, salt];

  const conn = await connection.getConnection();
  try {
    await conn.query(sql, values);
    return {
      status: StatusCodes.CREATED,
      message: "회원가입 성공",
    };
  } catch (error: any) {
    console.error("error!!!! ", error);
    if (error.code === "ER_DUP_ENTRY") {
      throw new HTTPError(StatusCodes.CONFLICT, "이미 등록된 이메일입니다.");
    }
    throw new HTTPError(StatusCodes.INTERNAL_SERVER_ERROR, "데이터베이스 오류");
  } finally {
    conn.release();
  }
};
