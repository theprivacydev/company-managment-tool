const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Esablish connection with Server
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'companyManagementToolDB'
});

// Initiate connection and initiate app by calling first inquirer prompts
connection.connect((err) => {
    if (err) throw err.stack;
    console.log(connection.threadId);
    firstUserChoice();
});

// First inquirer prompt
const firstUserChoice = () => {
    inquirer.prompt(
        {
            name: 'interaction',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',


            ]
        }).then(handleAnswer);
}

// Get employee info, then add to database
const employeeInfo = 
    [
        {
            name: 'first',
            type: 'input',
            message: 'What is the employee\'s first name?',
        },
        {
            name: 'last',
            type: 'input',
            message: 'What is the employee\'s last name?',
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is the employee\'s role?',
            choices: [
                'Sales Executive',
                'Engineer',
                'Accountant',
                'Data Analyst',
                'Brand Specialist',
                'Secretary',
                'Truck Driver',
                'IT Tech',
            ]
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is the employee\'s Manager?',
            choices: [
                'Denise Jenkins',
                'Darrel Johnson',
                'Rob Hammond',
            ]
        }
    ];

// Display data based on user choice
const handleAnswer = (answer) => {
    if (answer.interaction === 'View All Employees') {
        const query1 = 'SELECT employees.id, first_name, last_name, department, title, salary FROM employees LEFT JOIN roles ON role_id = department_id LEFT JOIN departments ON departments.id = department_id';
        connection.query(query1, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstUserChoice();
          });
    }

    if (answer.interaction === 'Add Employee') {
        inquirer.prompt(employeeInfo).then(addToDatabase)
    }
}


const addToDatabase = (response) => {
    const query2 = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)'
    connection.query(query2, 
        [response.first, response.last, response.role, response.manager], 
        (err, res) => {
        if (err) throw err;
        console.table(res);
        firstUserChoice();
      });
}