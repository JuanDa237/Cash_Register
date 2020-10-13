-- Run this after database.sql
-- Whit root user do this.

CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'cashier321';

-- Privileges
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.companies TO 'cashier'@'localhost';
GRANT SELECT, INSERT ON cashRegisterDatabase.roles TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.users TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.categories TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.products TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.ingredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.detailProductsIngredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.clients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.tickets TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDatabase.productsInTickets TO 'cashier'@'localhost';

-- Set password
ALTER USER 'cashier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cashier321';
FLUSH PRIVILEGES;