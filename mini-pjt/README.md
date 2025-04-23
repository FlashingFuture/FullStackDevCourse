# 진짜 유튜브 운영하는 것처럼 하는 프로젝트

## 기능명세

### 회원

- 로그인: id / pwd
- 회원가입: id / pwd / 이름
- 회원 정보 조회
- 회원 탈퇴

### 채널

- 채널 생성: body {channelTitle}
    - res 201: `${channelTitle}님 채널을 응원합니다.`
- 채널 수정: URL (id), body {channelTitle}
    - res 200: `채널명이 성공적으로 수정되었습니다.`
- 채널 삭제: URL (id)
    - res 200: `${channelTitle}이 정상적으로 삭제 되었습니다.`
- 채널 전체 조회
    - res 200: 채널 전체 데이터 json array
- 채널 개별 조회: URL (id)
    - res 200: 채널 개별 데이터 json
