-- Run this after database.sql
-- Whit root user do this.

CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'cashier321';

-- Privileges
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.company TO 'cashier'@'localhost';
GRANT SELECT, INSERT ON cashRegisterDB.roles TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.users TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.categories TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.products TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.ingredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.detailProductsIngredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.clients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.bills TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.productsInBills TO 'cashier'@'localhost';

-- Set password
ALTER USER 'cashier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cashier321';
FLUSH PRIVILEGES;