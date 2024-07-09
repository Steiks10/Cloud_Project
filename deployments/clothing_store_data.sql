
-- Crear la tabla products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating INT NOT NULL
);

-- Insertar datos desde el JSON
INSERT INTO products (name, image, price, rating) VALUES
  ('Black Hoodie', 'assets/images/products/image1.jpg', 20.00, 4),
  ('Branded Shoes', 'assets/images/products/image2.jpg', 13.50, 4),
  ('White', 'assets/images/products/image3.jpg', 85.00, 3),
  ('Gray Dress 1', 'assets/images/products/image4.jpg', 625.00, 3),
  ('Black T-Shirt (Mens)', 'assets/images/products/image5.jpg', 55.00, 5),
  ('Jeans Jacket', 'assets/images/products/image6.jpg', 115.00, 4),
  ('Black T-Shirt (Womens)', 'assets/images/products/image7.jpg', 25.00, 3),
  ('Beige Trench Coat', 'assets/images/products/image8.jpg', 52.00, 1),
  ('Stylish Shoes', 'assets/images/products/image9.jpg', 32.00, 2),
  ('Stylish Shoes - B', 'assets/images/products/image10.jpg', 55.00, 5),
  ('Beanie Black', 'assets/images/products/image11.jpg', 15.00, 1),
  ('Beanie Orange', 'assets/images/products/image12.jpg', 12.50, 2),
  ('Beanie Red', 'assets/images/products/image13.jpg', 14.50, 4),
  ('Cyan Long Sleeve Shirt', 'assets/images/products/image15.jpg', 15.50, 5),
  ('Yellow Raincoat', 'assets/images/products/image16.jpg', 12.50, 3);

