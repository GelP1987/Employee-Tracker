const mysql2 = require("mysql2");
require("dotenv").config();
// for mysql setup *visibke on github, don't use a strong password you don't want leaked
const db = mysql2.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "employees_db",
    },
    console.log("Connected to employees_db database")
);

module.exports = db;