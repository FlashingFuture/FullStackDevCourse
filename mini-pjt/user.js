const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);

const db = new Map();

app.post("/signin", (req, res) => {
  const { userId, userPassword } = req.body;
  const user = db.get(userId);
  if (!user) {
    return res.status(404).json({ error: "존재하지 않는 ID입니다." });
  }
  if (user.userPassword !== userPassword) {
    return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
  }
  return res.status(200).json({ message: `${user.userName}님, 환영합니다!` });
});

app.post("/signup", (req, res) => {
  const { userId, userPassword, userName } = req.body;
  if (db.get(userId)) {
    return res.status(409).json({ error: "이미 존재하는 ID입니다." });
  }
  db.set(userId, { userPassword, userName });
  return res.status(201).json({ message: `${userName}님, 환영합니다!` });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;

  const user = db.get(userId);
  if (!user) {
    return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
  }

  res.status(200).json(user);
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  if (!db.has(userId)) {
    return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
  }

  db.delete(userId);
  res.status(204).send();
});
