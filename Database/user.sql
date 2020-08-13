-- Run this after database.sql
-- Whit root user do this.

CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'cashier321';
GRANT SELECT, INSERT, UPDATE, DELETE ON cash_register_db.* TO 'cashier'@'localhost';
ALTER USER 'cashier'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cashier321';
FLUSH PRIVILEGES;