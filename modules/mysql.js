import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'kms',
  dateStrings: 'date',
  connectionLimit: 500
})

export function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
  })
}