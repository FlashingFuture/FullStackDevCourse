const express = require("express");
const app = express();
app.listen(1234);

const fruit = [
  { id: 1, name: "apple" },
  { id: 1, name: "orange" },
  { id: 1, name: "banana" },
  { id: 1, name: "blueberry" },
  { id: 1, name: "mango" },
];

app._router.get("/fruits", (req, res) => {
  res.json(fruits);
});

app.get("/fruits/:id", (req, res) => {
  let id = req.params.id;
});
