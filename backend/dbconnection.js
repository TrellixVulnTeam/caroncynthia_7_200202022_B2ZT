const Pool = require('pg').Pool;
require('dotenv').config({path:'./config/.env'})

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PSWRD,
    database: process.env.DB
})

module.exports = pool;