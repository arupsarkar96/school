import mysql from 'mysql2/promise';
import configuration from './config';

const pool: mysql.Pool = mysql.createPool({
    uri: configuration.MYSQL,
    charset: 'utf8mb4',
    waitForConnections: true,
    queueLimit: 10,
    multipleStatements: true,
    enableKeepAlive: true
})

export default pool;