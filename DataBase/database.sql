-- Crear la base de datos
CREATE DATABASE clothing_store;
-- USE clothing_store;

-- Crear la tabla products
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating INT NOT NULL
);

-- Insertar datos desde el JSON
INSERT INTO products (id, name, image, price, rating) VALUES
  (1, 'Black Hoodie', 'assets/images/products/image1.jpg', 20.00, 4),
  (2, 'Branded Shoes', 'assets/images/products/image2.jpg', 13.50, 4),
  (3, 'White', 'assets/images/products/image3.jpg', 85.00, 3),
  (4, 'Gray Dress 1', 'assets/images/products/image4.jpg', 625.00, 3),
  (5, 'Black T-Shirt (Mens)', 'assets/images/products/image5.jpg', 55.00, 5),
  (6, 'Jeans Jacket', 'assets/images/products/image6.jpg', 115.00, 4),
  (7, 'Black T-Shirt (Womens)', 'assets/images/products/image7.jpg', 25.00, 3),
  (8, 'Beige Trench Coat', 'assets/images/products/image8.jpg', 52.00, 1),
  (9, 'Stylish Shoes', 'assets/images/products/image9.jpg', 32.00, 2),
  (10, 'Stylish Shoes - B', 'assets/images/products/image10.jpg', 55.00, 5),
  (11, 'Beanie Black', 'assets/images/products/image11.jpg', 15.00, 1),
  (12, 'Beanie Orange', 'assets/images/products/image12.jpg', 12.50, 2),
  (13, 'Beanie Red', 'assets/images/products/image13.jpg', 14.50, 4),
  (15, 'Cyan Long Sleeve Shirt', 'assets/images/products/image15.jpg', 15.50, 5),
  (16, 'Yellow Raincoat', 'assets/images/products/image16.jpg', 12.50, 3);

-- CRUD

-- Crear un nuevo producto (utilizando un nombre existente)
INSERT INTO products (name, image, price, rating)
VALUES ('Beanie Green', 'assets/images/products/new.jpg', 14.99, 3);

-- Leer (seleccionar) todos los productos
SELECT * FROM products;

-- Leer (seleccionar) un producto específico
SELECT * FROM products WHERE name = 'Black Hoodie';

-- Actualizar un producto
UPDATE products SET price = 24.99 WHERE name = 'Black Hoodie';

-- Eliminar un producto
DELETE FROM products WHERE name = 'Black Hoodie';

SELECT COUNT(*) as total FROM products