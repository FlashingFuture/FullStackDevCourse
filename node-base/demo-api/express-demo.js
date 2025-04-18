const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, express!");
});

app.get("/hello", (req, res) => {
  res.json({
    say: "안녕하세요",
  });
});

const goodbye = {
  title: "goodbye",
  price: 2000,
  description: "Goodbye, World",
};

app.get("/products/1", (req, res) => {
  res.json(goodbye);
});

app.listen(1234);
