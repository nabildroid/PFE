import mysql from "mysql";

const DB = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "cerisst",
});

DB.connect(function (err) {
    if (err) throw err;
    console.log("Database is connected successfully !");
});

export default DB;
