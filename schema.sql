DROP DATABASE IF EXISTS employees_db;
create DATABASE employees_db;

use employees_db;

create table department(
    id: INT AUTO_INCREMENT PRIMARY KEY
    name: VARCHAR(30)
)
create table role(
    id: INT AUTO_INCREMENT PRIMARY KEY
    title: VARCHAR(30)
    salary: DECIMAL
    department_id: INT 
)
create table employee(
    id: INT AUTO_INCREMENT PRIMARY KEY
    first_name: VARCHAR(30)
    last_name: VARCHAR(30)
    role_id: INT
    manager_id: INT 

)