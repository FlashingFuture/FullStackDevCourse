const express = require("express");
const app = express();
app.listen(1234);

app.get("/", function (req, res) {
  res.send("Hello, World!");
});

app.get("/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);
  console.log(id);
  console.log(db.get(id));

  if (db.get(id) === undefined) {
    res.json({
      message: "없는 상품입니다.",
    });

    return;
  }

  res.json({
    id: id,
    productName: db.get(id),
  });

  return;
});

let db = new Map();

let notebook = {
  productName: "Notebook",
  price: 2000000,
};

let cup = {
  productName: "Cup",
  price: 4000,
};

let chair = {
  productName: "Chair",
  price: 200000,
};

db.set(1, notebook);
db.set(2, cup);
db.set(3, chair);
