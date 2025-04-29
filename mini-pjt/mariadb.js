const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "myNewPassword123",
  database: "Youtube",
  dateStrings: true,
});

module.exports = connection;
