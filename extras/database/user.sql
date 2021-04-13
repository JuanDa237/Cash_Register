-- Run this after database.sql
-- Whit root user do this.

CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'cashier321';

-- Privileges
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.company TO 'cashier'@'localhost';
GRANT SELECT, INSERT ON cashRegisterDB.role TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.user TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.category TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.product TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.ingredient TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.productsHasIngredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.client TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.bill TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cashRegisterDB.billsHasProducts TO 'cashier'@'localhost';

-- Set password
ALTER USER 'cashier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cashier321';
FLUSH PRIVILEGES;