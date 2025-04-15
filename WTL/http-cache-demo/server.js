const express = require("express");
const path = require("path");
const app = express();
const PORT = 8888;

app.use("/static", express.static(path.join(__dirname, "public")));

// 캐싱 테스트
// no-store: 캐시하지 말라는 의미
app.get("/no-store", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, "pages", "no-store.html"));
});

// max-age: 30초 캐시
app.get("/max-age", (req, res) => {
  res.set("Cache-Control", "max-age=30");
  res.sendFile(path.join(__dirname, "pages", "max-age.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
