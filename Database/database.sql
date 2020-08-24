CREATE DATABASE cashRegisterDatabase;
USE cashRegisterDatabase;

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    idCategory INT NOT NULL,
    CONSTRAINT fkCategoriyProduct FOREIGN KEY (idCategory) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,       
    name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE ingredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE detailProductsIngredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProduct INT NOT NULL,
    idIngredient INT NOT NULL,
    CONSTRAINT fkIngredients FOREIGN KEY (idProduct) REFERENCES ingredients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkProducts FOREIGN KEY (idIngredient) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
    spendingAmount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE clients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(15) NOT NULL,    
    address VARCHAR(20),
    phoneNumber VARCHAR(20),
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE tickets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idClient INT NOT NULL,
    CONSTRAINT fkClientTicket FOREIGN KEY (idClient) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    total INT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE detailTicketProducts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idTicket INT NOT NULL,
    idProduct INT NOT NULL,
    CONSTRAINT fkTickets FOREIGN KEY (idTicket) REFERENCES tickets (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkPro FOREIGN KEY (idProduct) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
    amount INT NOT NULL
);

SHOW TABLES;

-- Before this run user.sql or change the keys.ts document.