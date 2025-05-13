import { registerUser } from "../../routes/users/service/auth.service";

describe("registerUser", () => {
  test("정상 입력 -> 사용자 객체 반환", async () => {
    const result = await registerUser({
      email: "test@example.com",
      password: "securepass123",
      name: "홍길동",
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("email", "test@example.com");
    expect(result).toHaveProperty("name", "홍길동");
  });

  test("이메일 없음 -> 에러", async () => {
    await expect(
      registerUser({
        email: "",
        password: "pass",
        name: "홍길동",
      })
    ).rejects.toThrow("모든 필드를 입력해주세요.");
  });

  test("비밀번호 없음 -> 에러", async () => {
    await expect(
      registerUser({
        email: "test@example.com",
        password: "",
        name: "홍길동",
      })
    ).rejects.toThrow("모든 필드를 입력해주세요.");
  });

  test("이름 없음 -> 에러", async () => {
    await expect(
      registerUser({
        email: "test@example.com",
        password: "pass",
        name: "",
      })
    ).rejects.toThrow("모든 필드를 입력해주세요.");
  });

  test("모든 입력 없음 -> 에러", async () => {
    await expect(
      registerUser({
        email: "",
        password: "",
        name: "",
      })
    ).rejects.toThrow("모든 필드를 입력해주세요.");
  });
});

test("email 필드 없음 -> 에러", async () => {
  await expect(
    registerUser({
      password: "pass",
      name: "홍길동",
    } as any)
  ).rejects.toThrow("모든 필드를 입력해주세요.");
});
