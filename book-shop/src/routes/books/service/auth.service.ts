interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export const registerUser = async (input: RegisterInput) => {
  const { email, password, name } = input;

  if (!email || !password || !name) {
    throw new Error("모든 필드를 입력해주세요.");
  }

  // 여기선 간단하게 가짜 사용자 리턴 (DB 없음 가정)
  return {
    id: Math.floor(Math.random() * 10000),
    email,
    name,
  };
};
