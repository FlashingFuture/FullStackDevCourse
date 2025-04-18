const express = require("express");
const app = express();

app.listen(1234);

app.get("/products/:num", function (req, res) {
  num = parseInt(req.params.num);
  res.json({
    num: num,
  });
});
// https://www.youtube.com/@inSec93
// https://www.youtube.com/watch?v=mTmd2daJt6I
app.get("./nickname", function (req, res) {});

app.get("/watch", function (req, res) {
  const { v, t } = req.query;
  res.json({
    video: v,
    timeline: t,
  });
});
