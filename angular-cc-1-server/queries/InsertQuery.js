const pool= require('./dbConection');

async function insertQuery(name, image, price, rating) {
    let client;
    try {
        client = await pool.connect();

        const insertQuery = {
            text: 'INSERT INTO products (name, image, price, rating) ' +
                'VALUES ($1, $2, $3, $4)',
            values: [name, image, price, rating],
        };

        await client.query(insertQuery);

        console.log('Product inserted successfully');
    } catch (err) {
        console.error('Error inserting product:', err);
        throw new Error('Failed to insert product: ' + err.message);
    } finally {
        if (client) {
            client.release(); // Devolver la conexión al pool
        }
    }
}

module.exports = insertQuery;
