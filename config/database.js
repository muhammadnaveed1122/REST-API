require('dotenv').config();

const { createPool} = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});
  

module.exports = pool;

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: ""
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE my__db", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });


