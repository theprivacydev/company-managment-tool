const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Esablish connection with Server
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'companyDepartmentManagerDB'
});

connection.connect((err) => {
    if (err) throw err.stack;
    console.log(connection.threadId);
    userChoice();
});


const userChoice = () => {
    inquirer.prompt(
        {
            name: 'interaction',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',


            ]
        }).then(handleAnswer);
}

// Display data based on user choice
const handleAnswer = (answer) => {
    if (answer.interaction === 'View All Employees') {
        connection.query('SELECT * FROM employees INNER JOIN roles ON role_id', (err, res) => {
            if (err) throw err;
            console.table(res);
            userChoice();
          });

    }
}