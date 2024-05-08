const { Pool } = require('pg');
const { dbConfig } = require('../config');

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});
module.exports= pool;