import mysql from "mysql";


const DB =mysql.createConnection({
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ??"admin",
    password: process.env.DB_PASSWORD ??"admin",
    database: process.env.DB_NAME ??"cerist",
    ssl:true,
});

DB.connect(function (err) {
    if (err) throw err;
    console.log("Database is connected successfully !");
});

function query(sqlQuery, args = []) {
    return new Promise((res, f) => {
        DB.query(sqlQuery, args, (err, results, fields) => {
            if (err) {
                f(err);
            } else {
                res({ results, fields });
            }
        });
    });
}

export default query;
