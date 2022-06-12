import mysql from "mysql";


const DB =mysql.createConnection({
    host: "qfhi95794bta.eu-west-2.psdb.cloud",
    user: "sq64s70r5n56",
    password: "pscale_pw_rX63dMWbVJF06DnjpA-DG8lWehSHmHt7zZwV5Moj_jQ",
    database: "cerist",
    ssl:true,
});

DB.connect(function (err) {
    if (err) throw err;
    console.log("Database is connected successfully !");
});

export default DB;
