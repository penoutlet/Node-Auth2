CREATE DATABASE users_db;
USE users_db;

CREATE TABLE burgers (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR (20),
password BLOB,
email VARCHAR(30),
date TIMESTAMP,
PRIMARY KEY (id)
);

