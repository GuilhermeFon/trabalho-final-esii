CREATE DATABASE IF NOT EXISTS trabalho_esii;
USE trabalho_esii;

CREATE TABLE IF NOT EXISTS products (
  id INT(11) AUTO_INCREMENT,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  PRIMARY KEY (id)
);

INSERT INTO products VALUE(0, 'Monitor', 1500);
INSERT INTO products VALUE(0, 'Teclado', 350);
INSERT INTO products VALUE(0, 'Mouse', 200);