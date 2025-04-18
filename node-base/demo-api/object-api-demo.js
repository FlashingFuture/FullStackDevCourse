const express = require("express");
const app = express();

app.listen(1234);

// https://www.youtube.com/@inSec93
// https://www.youtube.com/watch?v=mTmd2daJt6I

const youtuber1 = {
  channelTitle: "인섹 Insec",
  sub: "6만명명",
  videoNum: "1000개",
};

const youtuber2 = {
  channelTitle: "인섹 Insec",
  sub: "6만명명",
  videoNum: "1000개",
};

const youtuber3 = {
  channelTitle: "인섹 Insec",
  sub: "6만명명",
  videoNum: "1000개",
};

app.get("./nickname", function (req, res) {
  const { nickname } = req.params;
  if (nickname == "1") {
    res.json(youtuber1);
  } else if (nickname == "2") {
    res.json(youtuber2);
  } else if (nickname == "3") {
    res.json(youtuber3);
  } else {
    res.json({
      message: "알 수 없는 유튜버입니다.",
    });
  }
});
