import { StatusCodes } from "http-status-codes";
import { HTTPError } from "@/utils/httpError";
import { LoginDto, LoginResponse } from "../types/auth.types";
import { signToken } from "@/utils/token";
import { connection } from "@/database/mariadb";
import { verifyPassword } from "@/utils/password";

export const loginUser = async ({
  email,
  password,
}: LoginDto): Promise<LoginResponse> => {
  if (!email || !password) {
    throw new HTTPError(StatusCodes.BAD_REQUEST, "모든 필드를 입력해주세요.");
  }

  const conn = await connection.getConnection();
  try {
    const [rows]: any = await conn.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      throw new HTTPError(
        StatusCodes.UNAUTHORIZED,
        "로그인 정보가 잘못되었습니다. 아이디나 비밀번호를 확인해주세요."
      );
    }

    const user = rows[0];
    console.log(user);

    if (!verifyPassword(password, user.salt, user.password)) {
      throw new HTTPError(
        StatusCodes.UNAUTHORIZED,
        "로그인 정보가 잘못되었습니다. 아이디나 비밀번호를 확인해주세요."
      );
    }

    const token = signToken(user.email);
    console.log(token);

    return {
      status: StatusCodes.OK,
      message: "로그인 성공",
      token,
    };
  } catch (error) {
    throw error;
  } finally {
    conn.release();
  }
};
