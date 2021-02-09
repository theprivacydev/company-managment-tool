const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Query = require('./queryGenerator.js')

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
    startCompanyReview();
});

const firstPrompt = 
    {
        name: 'interaction',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Remove Employee',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Update Employee Role',
            'Update Employee Manager',
            'I\'m Done'
        ]
    }

// Start application by starting the first inquirer prompt
function startCompanyReview() {
    inquirer.prompt(firstPrompt).then(handleAnswer);
}

// Employee info Prompts
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

const employeeList =  
    {
        name: 'manager',
        type: 'list',
        message: 'Who is the employee\'s Manager?',
        choices: [
            'Michelle Bartow',
            'Ryan Decker',
            'Rich Donner',
            'Rob Hammond',
            'Denise Jenkins',
            'Darrel Johnson',
            'John Smith',
            'Sally Willis'
        ]
    }

// Create the ability to generate a query using the other js file
const generateQuery = new Query(connection);


// Display data based on user choice
const handleAnswer = (answer) => {
    switch (answer.interaction) {
        case 'View All Employees':
            generateQuery.displayAllEmployees();
            inquirer.prompt(firstPrompt).then(handleAnswer);
            break;
    
        case 'Add Employee': 
            inquirer.prompt(employeeInfo).then(generateQuery.addToDatabase());
            inquirer.prompt(firstPrompt).then(handleAnswer);
            break;

        case 'Remove Employee':
            inquirer.prompt(employeeList).then(generateQuery.removeFromDatabase());
            inquirer.prompt(firstPrompt).then(handleAnswer);
            break;

        case 'I\'m Done':
            console.log('Thanks for using the Company Management Tool! Have a Nice Day!');
            connection.end();
            break;
    }
}


// const addToDatabase = (response) => {
//     const query2 = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)'
//     connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)', 
//         [response.first, response.last, response.role, response.manager], 
//         (err, res) => {
//         if (err) throw err;
//         console.table(res);
//         firstUserChoice();
//       });
// }

module.exports = connection;
// module.exports = firstUserChoice();