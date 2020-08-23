-- Run this after database.sql
-- Whit root user do this.

CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'cashier321';

-- Privileges
GRANT SELECT, INSERT, UPDATE ON cash_register_db.categories TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.products TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.ingredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.ingredients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.clients TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.tickets TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.detail_ticket_products TO 'cashier'@'localhost';
GRANT SELECT, INSERT, UPDATE ON cash_register_db.detail_products_ingredients TO 'cashier'@'localhost';

-- Set password
ALTER USER 'cashier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cashier321';
FLUSH PRIVILEGES;