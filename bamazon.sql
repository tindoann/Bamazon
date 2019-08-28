DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("hats", "accessories", 12.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirts", "tops", 10.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "bottoms", 45.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shorts", "bottoms", 25.00, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gloves", "accessories", 8.50, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polos", "tops", 18.25, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sunglasses", "accessories", 12.50, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bracelets", "accessories", 5.00, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("watches", "accessories", 85.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ties", "accessories", 12.50, 75);

"SELECT * FROM products"