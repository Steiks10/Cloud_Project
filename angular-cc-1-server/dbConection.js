const { Pool } = require('pg');
const { dbConfig } = require('./config');

const pool = new Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
});
async function selectQuery(perPage, start) {
    let client;
    try {
        client = await pool.connect();

        const productQuery = {
            text: 'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
            values: [perPage, start],
        };

        const productResult = await client.query(productQuery);

        const totalQuery = 'SELECT COUNT(*) as total FROM products';
        const totalResult = await client.query(totalQuery);

        const total = totalResult.rows[0].total;
        const totalPages = Math.ceil(total / perPage);

        const jsonData = {
            items: productResult.rows.map(row => ({
                id: row.id,
                name: row.name,
                image: row.image,
                price: parseFloat(row.price),
                rating: row.rating,
            })),
            total,
            page: start / perPage,
            perPage,
            totalPages,
        };
        console.log(jsonData)
        return jsonData;
    } catch (err) {
        console.error('Error fetching products:', err);
        throw new Error('Failed to retrieve products: ' + err.message);
    } finally {
        if (client) {
            client.release(); // Devolver la conexión al pool
        }
    }
}

module.exports = selectQuery;
