const mysql = require('mysql');
const connection = require('./index.js');

class Query {

    constructor (connection) {
        this.connection = connection;
    }

    displayAllEmployees = () => {
        this.connection.query('SELECT employees.id, first_name, last_name, department, title, salary FROM employees LEFT JOIN roles ON role_id = department_id LEFT JOIN departments ON departments.id = department_id', (err, res) => {
            if (err) throw err;
            console.table(res);
            });
    }

    addToDatabase = (response) => {
        this.connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)', 
        [response.first, response.last, response.role, response.manager], 
        (err, res) => {
        if (err) throw err;
        console.table(res);
        firstUserChoice();
        });
    }

}


module.exports = Query;