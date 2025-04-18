const express = require("express");
const app = express();
const PORT = 4000;

// // CASE 1: CORS 처리 안함
// app.get("/data", (req, res) => {
//   res.send("서버 응답: SOP에 의해 막힐 수도 있어요!");
// });
// CASE 2: CORS 허용 헤더 추가
app.get("/data", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.send("✅ 서버가 CORS 허용 → 브라우저가 응답 사용 가능!");
});

app.listen(PORT, () => {
  console.log(`백엔드 서버 실행 중: http://localhost:${PORT}`);
});
