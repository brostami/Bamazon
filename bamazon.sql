DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    dept_name VARCHAR(40) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Cat Food (16 lbs.)', 'Food', 15, 50);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Dog Food (20 lbs.)', 'Food', 20, 100);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Dog Collar', 'Accessories', 25, 25);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Catnip (1 oz.)', 'Treats', 5, 75);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Plush Squeaky Pig', 'Toys', 18, 20);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Leash (6 ft.)', 'Accessories', 10, 50);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Leash (Extendable)', 'Accessories', 15, 30);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Dog Treats', 'Treats', 10, 60);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Jingle Ball', 'Toys', 5, 50);

INSERT INTO products(product_name, dept_name, price, quantity)
VALUES ('Crate (Medium)', 'Crates & Carriers', 40, 20);

SELECT * FROM products;

update products set product_name = 'Leash (Extendable)' where id = 7;
