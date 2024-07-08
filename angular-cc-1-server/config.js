module.exports = {
    dbConfig: {
        user: 'postgres',
        host: process.env.DB_HOST, // Nombre del servicio de la base de datos
        database: 'clothing_store',
        password: 'db-1',
        port: 5432,
    }
};
