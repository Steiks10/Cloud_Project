const pool = require('./dbConection');


async function UpdateQuery(id) {
    let client;
    try {
        client = await pool.connect();


        const DeleteQuery = {
            text: 'DELETE FROM products WHERE id = $1',
            values: [id]
        };
        await client.query(DeleteQuery);

        console.log('Product deleted successfully');
    } catch (err) {
        console.error('Error deleting product:', err);
        throw new Error('Failed to delete product: ' + err.message);
    } finally {
        if (client) {
            client.release(); // Devolver la conexión al pool
        }
    }
}

module.exports = UpdateQuery;
