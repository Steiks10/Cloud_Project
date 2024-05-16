const pool = require('./dbConection');

// Función para obtener un producto por su ID
async function getProductById(id) {
    let client;
    try {
        client = await pool.connect();

        const query = {
            text: 'SELECT * FROM products WHERE id = $1',
            values: [id],
        };

        const result = await client.query(query);
        if (result.rows.length > 0) {
            return result.rows[0]; // Devuelve el primer resultado encontrado
        } else {
            return null; // No se encontró ningún producto con ese ID
        }
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        throw new Error('Error al obtener el producto: ' + err.message);
    } finally {
        if (client) {
            client.release(); // Devolver la conexión al pool
        }
    }
}

module.exports=getProductById;