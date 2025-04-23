const express = require("express");
const app = express();
app.use(express.json());
app.listen(7777);

const db = new Map();
const channelId = {
  value: 1,
};

app
  .route("/channels")
  .get((req, res) => {
    const allChannels = Array.from(db.values());
    res.status(200).json(allChannels);
  })
  .post((req, res) => {
    const { channelTitle } = req.body;
    if (!channelTitle) {
      return res.status(400).json({ error: "채널 제목이 필요합니다." });
    }

    const id = channelId.value++;
    db.set(id, { id, channelTitle });

    res
      .status(201)
      .json({ message: `${channelTitle}님 채널을 응원합니다.`, id });
  });

app
  .route("/channels/:id")
  .get((req, res) => {
    const id = req.params.id;
    const channel = db.get(id);

    if (!channel) {
      return res.status(404).json({ error: "채널을 찾을 수 없습니다." });
    }

    res.status(200).json(channel);
  })
  .put((req, res) => {
    const id = req.params.id;
    const { channelTitle } = req.body;

    if (!db.has(id)) {
      return res.status(404).json({ error: "채널을 찾을 수 없습니다." });
    }
    if (!channelTitle) {
      return res.status(400).json({ error: "채널 제목이 필요합니다." });
    }

    db.set(id, { id, channelTitle });
    res.status(200).json({ message: "채널명이 성공적으로 수정되었습니다." });
  })
  .delete((req, res) => {
    const id = req.params.id;
    const channel = db.get(id);

    if (!channel) {
      return res.status(404).json({ error: "채널을 찾을 수 없습니다." });
    }

    db.delete(id);
    res.status(200).json({
      message: `${channel.channelTitle}이 정상적으로 삭제 되었습니다.`,
    });
  });
