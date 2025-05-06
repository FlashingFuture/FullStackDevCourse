const express = require("express");
const app = express();
app.use(express.json()); // Content-Type: application/json 을 req.body에 파싱하는 미들웨어
const PORT = 1234;

app.listen(PORT, () => {
  console.log(`Youtube Manager Running on port ${PORT}`);
});

const db = new Map();
const youtuberId = {
  value: 1,
};

app.get("/youtubers", function (req, res) {
  if (db.size === 0) {
    return res.status(200).json({ message: "No youtuber registered." });
  }
  res.status(200).json([...db.values()]);
});

app.get("/youtubers/:id", function (req, res) {
  const id = Number(req.params.id);
  const youtuber = db.get(id);
  if (!youtuber) {
    return res.status(404).json({ error: "Youtuber not found." });
  }
  res.status(200).json(youtuber);
});

app.post("/youtubers", function (req, res) {
  const { channelTitle, subScribers, videoNum } = req.body;

  const newYoutuber = {
    channelTitle,
    subScribers,
    videoNum,
  };
  db.set(youtuberId.value++, newYoutuber);
  res.status(201).json(newYoutuber);
});

app.delete("/youtubers", function (req, res) {
  db.clear();
  res.status(204).json({ message: "All youtubers Removed." });
});

app.put("/youtubers/:id", function (req, res) {
  const id = Number(req.params.id);
  const youtuber = db.get(id);
  if (!youtuber) {
    return res.status(404).json({ error: "Youtuber not found." });
  }
  const { channelTitle } = req.body;
  if (!channelTitle) {
    return res.status(400).json({ error: "new channelTitle is required." });
  }

  const updated = { ...youtuber, channelTitle };
  db.set(id, updated);
  res.status(200).json(updated);
});
