const mysql = require('mysql');
const connection = require('../index.js');


class Query {

    constructor (connection) {
        this.connection = connection;
    }

    // Gets a list of employees from database
    getEmployeeList = () => {
       return new Promise((resolve, reject) => {
            this.connection.query('SELECT id, CONCAT(first_name," ", last_name) name FROM employees', (err, res) => {
                if (err) throw err;
                resolve(res);
            });
        });
    }

    // Gets a list of roles from database
    getRoleList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT roles.id, roles.title, roles.salary FROM roles ', (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
            });
        });
    }

    // Gets a list of departments from database
    getDepartmentList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM departments', (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
            });
        });
    }

    // Gets a list of managers from database
    getManagerList = () => {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT id, CONCAT(first_name, ' ', last_name) Managers FROM employees WHERE manager_id IS NULL", (err, res) => {
                if (err) throw err;
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
            this.connection.query('INSERT INTO employees SET ?',
            {first_name: answer.first, last_name: answer.last, role_id: answer.role, manager_id: answer.manager}, 
            (err, res) => {
            if (err) throw err;
            // roleList.push({name: res.first, value: res.id});
            console.log(res);
            console.table(res);
            resolve(res);
            });
        });
    }

    // Removes employee from database
    removeEmployeeFromDatabase = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM employees WHERE id = ?', [answer.chooseEmployee], (err, res) => {
                if (err) throw err;
                console.table("\n", res);
                resolve(res);
                });
        });
    }

    // Adds role to database
    addRole = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO roles SET ?', {title: answer.role, salary: answer.salary, department_id: answer.department}, (err, res) => {
                if (err) throw err;
                // this.getRoleList();
                resolve(res);
                });
        });
    }

    // Removes role from database
    removeRole = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('DELETE FROM roles WHERE ?', [answer.chooseRole], (err, res) => {
                if (err) throw err;
                console.table(this.getRoleList());
                resolve(res);
                });
        });
    }

    // Adds department to database
    addDepartment = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO departments SET ?,', {department: answer.chooseDepartment}, (err, res) => {
                if (err) throw err;
                this.getDepartmentList();
                resolve(res);
                });
        });
    }


    // Updates a selected employee's role
    updateEmployeeRole = (answer) => {
        // return new Promise((resolve, reject) => {
            this.connection.query('UPDATE roles WHERE id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table(this.displayAllEmployees());
                // resolve(res);
                });
        // });

    }

    // Updates a selected employee's manager
    updateEmployeeManager = (answer) => {
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE employees WHERE manager_id = ?', [answer.id], (err, res) => {
                if (err) throw err;
                console.table(this.displayAllEmployees());
                resolve(res);
                });
        });
    }

}


module.exports = Query;