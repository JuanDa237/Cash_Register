import mysql from "promise-mysql";

import keys from "./keys";

const pool = mysql.createPool(keys.database);

pool.get("getConnection")
    .then(async connection => {
        (await pool).releaseConnection;
        console.log("DB is connected.");
    });

export default pool;