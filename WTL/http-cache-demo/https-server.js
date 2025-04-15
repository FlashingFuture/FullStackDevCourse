const https = require("https");
const fs = require("fs");
const path = require("path");

// 인증서 파일 로드
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// HTTPS 서버 생성
https
  .createServer(options, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h1>🔒 HTTPS 연결 성공!</h1><p>브라우저 주소창에 🔒 자물쇠를 확인해 보세요.</p>"
    );
  })
  .listen(8443, () => {
    console.log("HTTPS 서버 실행 중: https://localhost:8443");
  });
