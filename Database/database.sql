CREATE DATABASE cash_register_db;
USE cash_register_db;

CREATE TABLE products (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,        
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

CREATE TABLE tickets (
    _id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    clientName VARCHAR(15) NOT NULL,
    domicile BOOLEAN NOT NULL,
    address VARCHAR(20),
    phoneNumber VARCHAR(20)
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