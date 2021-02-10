const mysql = require('mysql');
const connection = require('./index.js');
const startCompanyReview = require('./index.js');
const employeeInfo = require('./index.js');
const employeeList = require('./index.js');

class Query {

    constructor (connection) {
        this.connection = connection;
    }

    getAllEmployees = () => {
       return new Promise((resolve, reject) => {
            connection.query('SELECT first_name, last_name FROM employees', (err, res) => {
                if (err) throw err;
                employeeList.push(res);
                console.log(res);
                resolve(res);
            });
        });
    }

    displayAllEmployees = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT employees.id, first_name, last_name, department, title, salary FROM employees LEFT JOIN roles ON role_id = department_id LEFT JOIN departments ON departments.id = department_id', (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
          
    }



    addToDatabase = (answer) => {
        this.connection.query('INSERT INTO employees VALUE (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)', 
        [answer.first, answer.last, answer.role, answer.manager], 
        (err, res) => {
        if (err) throw err;
        employeeList.push(res.first_name + res.last_name);
        console.table(res);
        });
        // startCompanyReview;
    }

    removeFromDatabase = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM employees WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });

    }


    updateRole = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE roles WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });

    }

    updateManager = (answer) => {
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