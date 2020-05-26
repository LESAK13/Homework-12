DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE employees(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER(11),
    manager VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE departments(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(6),
    department_id INTEGER(11),
    PRIMARY KEY(id)
);

USE employee_trackerDB;

INSERT INTO departments (department) VALUES ("Sales");
INSERT INTO departments (department) VALUES ("Engineering");
INSERT INTO departments (department) VALUES ("Finance");
INSERT INTO departments (department) VALUES ("Legal");

USE employee_trackerDB;

INSERT INTO roles (title, salary, department_id) VALUES ("Sales Lead", 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Salesperson", 55000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ("Lead Engineer", 85000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Software Engineer", 65000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ("Accountant", 75000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Assistant Accountant", 45000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ("Legal Team Lead", 150000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ("Lawyer", 100000, 4);

USE employee_trackerDB;

INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("Kevin", "Lesak", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Lora", "Lesak", 2, "Kevin Lesak");
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Gary", "Smith", 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Tom", "Woods", 4, "Gary Smith");
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Will", "Fitzpatrick", 5, null);
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Lisa", "Abbott", 6, "Will Fitzpatrick");
INSERT INTO employees (first_name, last_name, role_id, manager)  VALUES ("Denise", "Rodgers", 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager) VALUES ("Anita", "Jones", 8, "Denise Rodgers");