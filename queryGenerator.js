const mysql = require('mysql');
const connection = require('./index.js');
const startCompanyReview = require('./index.js');
const employeeInfo = require('./index.js');
const employeeList = require('./index.js');
const roleList = require('./index.js');
const managerList = require('./index.js');

class Query {

    constructor (connection) {
        this.connection = connection;
    }

    // Gets a list of employees from database to push into an array to be used for inquirer choices in list prompt
    getEmployeeList = () => {
       return new Promise((resolve, reject) => {
            this.connection.query('SELECT CONCAT(first_name," ", last_name) FROM employees', (err, res) => {
                if (err) throw err;
                employeeList.push(res)
                resolve(res);
            });
        });
    }

    // Gets a list of roles from database to push into an array to be used for inquirer choices in list prompt
    getRoleList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT title FROM roles', (err, res) => {
                if (err) throw err;
                roleList.push(res);
                resolve(res);
            });
        });
    }

    // Gets a list of managers from database to push into an array to be used for inquirer choices in list prompt
    getManagerList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT first_name, last_name FROM employees WHERE manager_id = null', (err, res) => {
                if (err) throw err;
                managerList.push(res);
                resolve(res);
            });
        });


    }

    // Displays all employees and their id, title, salary, department and manager
    displayAllEmployees = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT employees.id, first_name, last_name, department, title, salary FROM employees LEFT JOIN roles ON role_id = department_id LEFT JOIN departments ON departments.id = department_id', (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
          
    }


    // Adds employee to database
    addEmployeeToDatabase = (answer) => {
        this.connection.query('INSERT INTO employees VALUE (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)', 
        [answer.first, answer.last, answer.role, answer.manager], 
        (err, res) => {
        if (err) throw err;
        employeeList.push(res.first_name + res.last_name);
        console.table(res);
        });
    }

    // Removes employee from database
    removeEmployeeFromDatabase = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM employees WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
    }

    // Updates a selected employee's role
    updateEmployeeRole = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE roles WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });

    }

    // Updates a selected employee's manager
    updateEmployeeManager = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE employees WHERE manager_id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
    }

}


module.exports = Query;