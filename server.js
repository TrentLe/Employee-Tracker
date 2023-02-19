const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Middleware
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log(`Connected to the employee_tracker database.`)
);

db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_tracker database.`);
    start();
});

// Start the application
function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee role',
                'Exit'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    db.end();
                    break;
            }
        });
}

// View all employees
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// View all departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// View all roles
function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

// Add employee
function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'What is the employee\'s first name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'What is the employee\'s last name?'
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is the employee\'s role?',
                choices: [
                    'Scout Regiment',
                    'Military Police',
                    'Survey Corps',
                    'Marleyan Army',
                ]

            },
           
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee added.');
                    start();
                }
            );
        });
}

