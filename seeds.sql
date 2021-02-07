DROP DATABASE IF EXISTS companyDepartmentManagerDB;

CREATE DATABASE companyDepartmentManagerDB;

USE companyDepartmentManagerDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO departments (name)
VALUES ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Executive", 50000.00, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 100000.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Hammond", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Denise", "Jenkins", 1, 1);