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

// Create first user prompt
const firstPrompt = 
    {
        name: 'interaction',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',

            'I\'m Done'
        ]
    }

// Start application by starting the first inquirer prompt
function startCompanyReview() {
    inquirer.prompt(firstPrompt).then(handleAnswer);
}

// Create employee info prompts
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

// Creates an empty array to push employee names into from database to make them accessible
const employeeList =  [];

// Creates inquirer prompt that allows user to choose from list of employees
const 

// Create the ability to generate a query using the other js file
const generateQuery = new Query(connection);


// Display data based on user choice
const handleAnswer = (answer) => {
    switch (answer.interaction) {
        case 'View All Employees':
            generateQuery.displayAllEmployees().then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer)
            });
            break;
    
        case 'Add Employee': 
            inquirer.prompt(employeeInfo).then(generateQuery.addToDatabase(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Remove Employee':
            inquirer.prompt(employeeList).then(generateQuery.removeFromDatabase(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Update Employee Role':
            inquirer.prompt(employeeList).then(generateQuery.updateRole(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Update Employee Manager':
            inquirer.prompt(employeeList).then(generateQuery.updateManager(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'I\'m Done':
            console.log('Thanks for using the Company Management Tool! Have a Nice Day!');
            connection.end();
            break;
    }
}


// Export necessary modules to be required in generateQuery.js
module.exports = connection;
module.exports = startCompanyReview;
module.exports = employeeInfo;
module.exports = employeeList;