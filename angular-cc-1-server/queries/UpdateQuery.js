const pool = require('./dbConection');

// Función para obtener un producto por su ID
async function obtenerProductoPorId(id) {
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

async function UpdateQuery(id, name, image, price, rating) {
    let client;
    try {
        client = await pool.connect();

        const productoOriginal = await obtenerProductoPorId(id);

        const UpdateQuery = {
            text: 'UPDATE products SET ',
            values: []
        };
        UpdateQuery.values.length
        if (name !== productoOriginal.name) {
            UpdateQuery.values.push(name);
            UpdateQuery.text += `name = $${UpdateQuery.values.length}, `;
        }
        if (image !== productoOriginal.image) {
            UpdateQuery.values.push(image);
            UpdateQuery.text += `image = $${UpdateQuery.values.length}, `;
        }
        if (price !== productoOriginal.price) {
            UpdateQuery.values.push(price);
            UpdateQuery.text += `price = $${UpdateQuery.values.length}, `;
        }
        if (rating !== productoOriginal.rating) {
            UpdateQuery.values.push(rating);
            UpdateQuery.text += `rating = $${UpdateQuery.values.length}, `;
        }

        // Eliminar la última coma y espacio del texto de la consulta
        UpdateQuery.text = UpdateQuery.text.slice(0, -2);

        // Agregar la condición WHERE
        UpdateQuery.values.push(id);
        UpdateQuery.text += ` WHERE id = $${UpdateQuery.values.length}`;

        await client.query(UpdateQuery);

        console.log('Product updated successfully');
    } catch (err) {
        console.error('Error updating product:', err);
        throw new Error('Failed to update product: ' + err.message);
    } finally {
        if (client) {
            client.release(); // Devolver la conexión al pool
        }
    }
}

module.exports = UpdateQuery;
