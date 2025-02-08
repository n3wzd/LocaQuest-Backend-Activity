import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.NODEJS_DATASOURCE_HOST,
    port: Number(process.env.NODEJS_DATASOURCE_PORT), 
    user: process.env.NODEJS_DATASOURCE_USERNAME,
    password: process.env.NODEJS_DATASOURCE_PASSWORD,
    database: process.env.NODEJS_DATASOURCE_DATABASE,
    connectionLimit: 20,
  });

export default pool;
