const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Main page");
  response.end();
}

function login(response) {
  console.log("login");

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Login page");
  response.end();
}

function who(response) {
  console.log("Who do you think I am");

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.write("내가바로정기영");
  response.end();
}

let handle = {}; // key: value
handle["/"] = main;
handle["/login"] = login;
handle["/who"] = who;

exports.handle = handle;
