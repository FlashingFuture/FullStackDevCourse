const login = (event) => {
  event.preventDefault();

  const form = event.target;
  const ID = form.userId.value;
  const PW = form.userPw.value;

  if (!ID) {
    alert("아이디를 입력해주세요.");
    return;
  }

  if (!PW) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  alert("로그인 시도 감지됨!!\n" + "ID: " + ID + "\n" + "PW: " + PW);
};
