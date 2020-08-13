CREATE DATABASE cash_register_db;
USE cash_register_db;

CREATE TABLE products (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,        
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE ingredients (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount INT NOT NULL
);

CREATE TABLE detail_products_ingredients (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    id_ingredient INT NOT NULL,
    CONSTRAINT fk_ing FOREIGN KEY (id_ingredient) REFERENCES ingredients (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_pro FOREIGN KEY (id_product) REFERENCES products (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    spendingAmount INT NOT NULL
);

SHOW TABLES;

-- Before this run user.sql or change the keys.ts document.