CREATE DATABASE cash_register_db;
USE cash_register_db;

CREATE TABLE categories (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE products (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_category INT NOT NULL,
    CONSTRAINT fk_cat_pro FOREIGN KEY (id_category) REFERENCES categories (_id) ON DELETE CASCADE ON UPDATE CASCADE,       
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE ingredients (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE detail_products_ingredients (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_product INT NOT NULL,
    id_ingredient INT NOT NULL,
    CONSTRAINT fk_ingredients FOREIGN KEY (id_ingredient) REFERENCES ingredients (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_products FOREIGN KEY (id_product) REFERENCES products (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    spendingAmount INT NOT NULL
);

CREATE TABLE clients (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(15) NOT NULL,    
    address VARCHAR(20),
    phoneNumber VARCHAR(20),
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE tickets (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_client INT NOT NULL,
    CONSTRAINT fk_cli_tic FOREIGN KEY (id_client) REFERENCES clients (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    total INT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE detail_ticket_products (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_ticket INT NOT NULL,
    id_product INT NOT NULL,
    CONSTRAINT fk_ticets FOREIGN KEY (id_ticket) REFERENCES tickets (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_pro FOREIGN KEY (id_product) REFERENCES products (_id) ON DELETE CASCADE ON UPDATE CASCADE,
    amount INT NOT NULL
);

SHOW TABLES;

-- Before this run user.sql or change the keys.ts document.