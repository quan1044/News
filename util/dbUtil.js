var config = require('../config/config');
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "laravel_demo"
});

module.exports = {
    runQuery: (query) => new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) throw err; // not connected!

            // Use the connection
            connection.query(query, function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();

                // Handle error after the release.
                if (error) throw error;
                else resolve(results)
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    })
}
