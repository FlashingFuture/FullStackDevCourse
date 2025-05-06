const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, query, param } = require("express-validator");
const validateRequest = require("../utils/validateRequest");

router.use(express.json());

router
  .route("/channels")
  .get(
    [
      query("userName").notEmpty().withMessage("query userName 필요"),
      validateRequest,
    ],
    (req, res) => {
      const { userName } = req.query;

      conn.query(
        "SELECT id FROM users WHERE name = ?",
        [userName],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "데이터베이스 오류" });
          }
          if (results.length === 0) {
            return res
              .status(404)
              .json({ error: "존재하지 않는 사용자명입니다." });
          }
          const userId = results[0].id;
          conn.query(
            "SELECT * FROM channels WHERE user_id = ?",
            [userId],
            (err, results) => {
              if (err) {
                return res.status(500).json({ error: "데이터베이스 오류 " });
              }
              return res.status(200).json(results);
            }
          );
        }
      );
    }
  )
  .post(
    [
      body("userName").notEmpty().withMessage("body userName 필요"),
      body("name").notEmpty().withMessage("body name 필요"),
      validateRequest,
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        return res.status(401).json(err.array());
      }

      const { name, userName } = req.body;

      conn.query(
        "SELECT id FROM users WHERE name = ?",
        [userName],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "데이터베이스 오류" });
          }
          const userId = results[0].id;
          conn.query(
            "INSERT INTO channels (name, user_id) VALUES (?, ?)",
            [name, userId],
            (err, results) => {
              if (err) {
                return res.status(500).json({ error: "데이터베이스 오류 " });
              }

              return res.status(201).json({ message: "채널 생성 성공" });
            }
          );
        }
      );
    }
  )
  .put(
    [
      query("name").notEmpty().withMessage("query name 필요"),
      body("newName").notEmpty().withMessage("body newName 필요"),
      validateRequest,
    ],
    (req, res) => {
      const { name } = req.query;
      const { newName } = req.body;

      conn.query(
        "UPDATE channels SET name = ? WHERE name = ?",
        [newName, name],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "데이터베이스 오류 " });
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ error: "수정할 채널을 찾을 수 없습니다." });
          }
          return res.status(200).json({
            message: `채널명이 ${newName}으로 성공적으로 변경되었습니다.`,
          });
        }
      );
    }
  )
  .delete(
    [query("name").notEmpty().withMessage("query name 필요"), validateRequest],
    (req, res) => {
      const { name } = req.query;

      conn.query(
        "DELETE FROM channels WHERE name = ?",
        [name],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "데이터베이스 오류 " });
          }
          if (results.affectedRows === 0) {
            return res
              .status(404)
              .json({ error: "삭제할 채널을 찾을 수 없습니다." });
          }
          return res.status(204).send();
        }
      );
    }
  );

router
  .route("/channels/:name")
  .get(
    [param("name").notEmpty().withMessage("params name 필요"), validateRequest],
    (req, res) => {
      const { name } = req.params;

      conn.query(
        "SELECT * FROM channels WHERE name = ?",
        [name],
        (err, results) => {
          if (err) {
            return res.status(500).json({ error: "데이터베이스 오류" });
          }
          if (results.length === 0) {
            return res
              .status(404)
              .json({ error: "해당 채널을 찾을 수 없습니다." });
          }
          return res.status(200).json(results);
        }
      );
    }
  );

module.exports = router;
