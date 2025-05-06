const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const jwt = require("jsonwebtoken");
const { signToken } = require("../utils/jwt");

router.use(express.json());

router.route("/join").post((req, res) => {
  const { email, name, password, contact } = req.body;

  conn.query(
    "INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)",
    [email, name, password, contact],
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          if (err.sqlMessage.includes("email_UNIQUE")) {
            return res.status(409).json({ error: "이미 등록된 이메일입니다." });
          }
        }
        return res.status(500).json({ error: "데이터베이스 오류 " });
      }
      return res.status(201).json({ message: "회원가입 성공" });
    }
  );
});

router.route("/login").post((req, res) => {
  const { email, password } = req.body;

  conn.query(
    "SELECT email, password FROM users WHERE email = ?",
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "데이터베이스 오류 " });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .json({ error: "이메일 또는 비밀번호가 틀렸습니다." });
      }
      if (password !== results[0].password) {
        return res
          .status(401)
          .json({ error: "이메일 또는 비밀번호가 틀렸습니다." });
      }

      const token = signToken(email);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "lax",
        // secure: true,
      });

      return res.status(200).json({ message: "로그인 성공" });
    }
  );
});

router
  .route("/users")
  .get((req, res) => {
    const { name } = req.query;

    conn.query(
      "SELECT name, email, contact, created_at FROM users WHERE name = ?",
      [name],
      function (err, results) {
        if (err) {
          return res.status(500).json({ error: "데이터베이스 오류 " });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }
        return res.status(200).json(results);
      }
    );
  })
  .delete((req, res) => {
    const { name } = req.query;

    conn.query("DELETE FROM users WHERE name = ?", [name], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "데이터베이스 오류 " });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }
      return res.status(204).send();
    });
  });

module.exports = router;
