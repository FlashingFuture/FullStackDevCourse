const express = require("express");
const app = express();
const PORT = 3000;

const posts = [];

app.get("/", (req, res) => {
  const list = posts.map((p) => `<li>${p}</li>`).join("");

  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'"
  );

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>XSS 게시판</title>
    </head>
    <body>
      <h1>📝 게시판</h1>
      <form method="GET" action="/post">
        <input name="content" placeholder="내용 입력" required />
        <button>작성</button>
      </form>
      <h2>글 목록</h2>
      <ul>${list}</ul>
    </body>
    </html>
  `;
  res.send(html);
});

app.get("/post", (req, res) => {
  const { content } = req.query;
  posts.push(content);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`🟢 서버 실행: http://localhost:${PORT}`);
});
