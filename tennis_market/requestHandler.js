const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log(main_view);

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  const today = new Date().toISOString().split("T")[0];

  if (productId) {
    mariadb.query(
      "INSERT INTO orderlist VALUES (?, ?)",
      [productId, today],
      function (err) {
        if (err) console.error("DB insert 실패:", err);
        else console.log("주문 저장 완료:", productId);
      }
    );
  }

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    if (err) {
      console.error("조회 실패:", err);
      response.end("조회 실패");
      return;
    }

    const tableRows = rows
      .map((row) => {
        return `<tr><td>${row.productId}</td><td>${
          row.date.toISOString().split("T")[0]
        }</td></tr>`;
      })
      .join("\n");

    const finalHtml = orderlist_view.replace("{{TABLE_ROWS}}", tableRows);
    response.end(finalHtml);
  });
}

function getAssetFile(response, filePath, contentType) {
  fs.readFile(filePath, function (err, data) {
    response.writeHead(200, { "Content-Type": contentType });
    response.write(data);
    response.end();
  });
}

let handle = {}; // key: value
handle["/"] = main;
handle["/order"] = order;
// static assets
handle["/assets/img/redRacket.png"] = (response) =>
  getAssetFile(response, "./assets/img/redRacket.png", "image/png");
handle["/assets/img/blueRacket.png"] = (response) =>
  getAssetFile(response, "./assets/img/blueRacket.png", "image/png");
handle["/assets/img/blackRacket.png"] = (response) =>
  getAssetFile(response, "./assets/img/blackRacket.png", "image/png");
handle["/assets/style.css"] = (response) => {
  getAssetFile(response, "./assets/style.css", "text/css");
};

exports.handle = handle;
