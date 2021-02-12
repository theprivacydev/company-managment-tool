const mysql = require('mysql');
const connection = require('./index.js');
const getEmployeeInfo = require('./index.js');
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
            this.connection.query('SELECT id, CONCAT(first_name," ", last_name) name FROM employees', (err, res) => {
                if (err) throw err;
                // employeeList.push({name: res.name, value: res.id});
                resolve(res);
            });
        });
    }

    // Gets a list of roles from database to push into an array to be used for inquirer choices in list prompt
    getRoleList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT title, id FROM roles', (err, res) => {
                if (err) throw err;
                roleList.push(res);
                console.log(roleList);
                console.log("You've add a role!");
                console.table(this.getRoleList);
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
            this.connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, CONCAT(m.first_name, " ", m.last_name) manager FROM employees LEFT JOIN employees m ON employees.id = m.id LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id', (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
          
    }


    // Adds employee to database
    addEmployeeToDatabase = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO employees VALUE (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)', 
            [answer.firstName, answer.lastName, answer.roleId, answer.managerId], 
            (err, res) => {
            if (err) throw err;
            employeeList.push(res.first_name + res.last_name);
            console.table(res);
            resolve(res);
            });
        });
    }

    // Removes employee from database
    removeEmployeeFromDatabase = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM employees WHERE id = ?', [answer], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
    }

    addRole = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO roles VALUE ?', [answer], (err, res) => {
                if (err) throw err;
                roleList.push(answer);
                console.table(res);
                resolve(res);
                });
        });
    }

    addDepartment = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO roles VALUE ?', [answer], (err, res) => {
                if (err) throw err;
                console.table();
                resolve(res);
                });
        });
    }


    // Updates a selected employee's role
    updateEmployeeRole = (answer) => {
        // return new Promise((resolve, reject) => {
            this.connection.query('UPDATE roles WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                // resolve(res);
                });
        // });

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