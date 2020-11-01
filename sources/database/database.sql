CREATE DATABASE cashRegisterDatabase;
USE cashRegisterDatabase;

CREATE TABLE companies (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    image VARCHAR(100) NOT NULL,
    ticketMessage VARCHAR(60) NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT false,
    active BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users (
    idCompany INT NOT NULL,
    idRole INT NOT NULL,
    CONSTRAINT fkCompanyUser FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkRoleUser FOREIGN KEY (idRole) REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE categories (
    idCompany INT NOT NULL,
    CONSTRAINT fkCompanyCategory FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE products (
    idCompany INT NOT NULL,
    idCategory INT NOT NULL,
    CONSTRAINT fkCompanyProduct FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkCategoriyProduct FOREIGN KEY (idCategory) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE ingredients (
    idCompany INT NOT NULL,
    CONSTRAINT fkCompanyIngredient FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    priceByUnit FLOAT NOT NULL,
    amount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE detailProductsIngredients (
    idCompany INT NOT NULL,
    idProduct INT NOT NULL,
    idIngredient INT NOT NULL,
    CONSTRAINT fkCompany FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkIngredients FOREIGN KEY (idIngredient) REFERENCES ingredients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkProducts FOREIGN KEY (idProduct) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    spendingAmount INT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE clients (
    idCompany INT NOT NULL,
    CONSTRAINT fkCompanyClient FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,    
    address VARCHAR(30),
    phoneNumber VARCHAR(15),
    creationDate DATE NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE tickets (
    idCompany INT NOT NULL,
    idClient INT NOT NULL,
    CONSTRAINT fkCompanyTicket FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkClientTicket FOREIGN KEY (idClient) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    creationDate DATE NOT NULL,
    total INT NOT NULL,
    homeDelivery BOOLEAN NOT NULL DEFAULT false,
    priceOfHomeDelivery INT
);

CREATE TABLE productsInTickets (
    idCompany INT NOT NULL,
    idTicket INT NOT NULL,
    CONSTRAINT fkCompanyProductsInTickets FOREIGN KEY (idCompany) REFERENCES companies (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fkTickets FOREIGN KEY (idTicket) REFERENCES tickets (id) ON DELETE CASCADE ON UPDATE CASCADE,
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    amount INT NOT NULL
);

SHOW TABLES;

-- Before this run user.sql or change the keys.ts document.