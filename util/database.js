const mysql=require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodecomplete',
    password: 'Shubh@111'
})

module.exports = pool.promise();