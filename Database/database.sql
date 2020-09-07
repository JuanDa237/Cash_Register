CREATE DATABASE cashRegisterDatabase;
USE cashRegisterDatabase;

CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    idCategory INT NOT NULL,
    CONSTRAINT fkCategoriyProduct FOREIGN KEY (idCategory) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,       
    name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE ingredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    priceByUnit FLOAT NOT NULL,
    amount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE detailProductsIngredients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProduct INT NOT NULL,
    idIngredient INT NOT NULL,
    CONSTRAINT fkIngredients FOREIGN KEY (idIngredient) REFERENCES ingredients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkProducts FOREIGN KEY (idProduct) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
    spendingAmount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE clients (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,    
    address VARCHAR(30),
    phoneNumber VARCHAR(15),
    creationDate DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE tickets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idClient INT NOT NULL,
    CONSTRAINT fkClientTicket FOREIGN KEY (idClient) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    creationDate DATE NOT NULL,
    total INT NOT NULL,
    homeDelivery BOOLEAN NOT NULL DEFAULT false,
    priceOfHomeDelivery INT
);

CREATE TABLE productsInTickets (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idTicket INT NOT NULL,
    CONSTRAINT fkTickets FOREIGN KEY (idTicket) REFERENCES tickets (id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    amount INT NOT NULL
);

SHOW TABLES;

-- Before this run user.sql or change the keys.ts document.