
import mysql from 'mysql2/promise';
import configuration from './serverconf';

const database: mysql.Pool = mysql.createPool({
    uri: configuration.MYSQL,
    charset: 'utf8mb4',
    waitForConnections: true,
    queueLimit: 75,
    multipleStatements: true,
    enableKeepAlive: true
})

export default database;