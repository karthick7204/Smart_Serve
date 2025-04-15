const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'smart_serve'
});
db.connect(err => {
    if (err) throw err;
    console.log('✅ MySQL Connected...');
});
module.exports = db;
