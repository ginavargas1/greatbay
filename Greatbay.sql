DROP DATABASE IF EXISTS greatbayDB;

CREATE DATABASE greatbayDB;

USE greatbayDB;

CREATE TABLE listings (
   id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NOT NULL,
  catagory VARCHAR(45) NOT NULL,
  price INTEGER(255) NOT NULL,
  PRIMARY KEY (id)
);
