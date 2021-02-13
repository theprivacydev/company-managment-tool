const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Query = require('./model/queryGenerator.js');

// Establish connection with database
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

// Create the ability to generate a query using the other js file
const generateQuery = new Query(connection);

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
            'Add Role',
            'Add Department',
            'Update Employee Role',
            'Update Employee Manager',

            'I\'m Done'
        ]
    }



// Creates inquirer prompt that allows user to choose from list of employees

const chooseEmployee = (employeeList) => [
    {
        name: 'chooseEmployee',
        type: 'list',
        message: 'Which employee would you like to choose for this action?',
        choices: employeeList.map(employee => ({name: employee.name, value: employee.id}))

    },
]

const chooseRole = (rolesList) => [
{
    name: 'chooseRole',
    type: 'list',
    message: 'Choose role you would like to add?',
    choices: rolesList.map(role => ({name: role.title, value: role.id}))
}
]

const chooseDepartment = (departmentList) => [
    {
        name: 'chooseDepartment',
        type: 'input',
        message: 'Choose the department you would like to add.',
        choices: departmentList.map(d => ({name: d.department, value: d.id}))
    }
    ]


// Create employee info prompts
const employeeInfo = (roleList, managerList) =>
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
        choices: roleList.map(role => ({name: role.title, value: role.id}))
    },
    {
        name: 'manager',
        type: 'list',
        message: 'Who is the employee\'s Manager?',
        choices: managerList.map(manager => ({name: manager.name, value: manager.id}))
    }
];


// Start application by starting the first inquirer prompt
function startCompanyReview() {
    inquirer.prompt(firstPrompt).then(handleAnswer);
}


// Display data based on user choice
const handleAnswer = async (answer) => {
    switch (answer.interaction) {
        case 'View All Employees':
            generateQuery.displayAllEmployees().then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer)
            });
            break;
    
        case 'Add Employee': 
            let roleList = await generateQuery.getRoleList();
            const managerList = await generateQuery.getManagerList();
            inquirer.prompt(employeeInfo(roleList, managerList)).then(generateQuery.addEmployeeToDatabase).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Remove Employee':
            const employeeList = await generateQuery.getEmployeeList();
            inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.removeEmployeeFromDatabase(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Add Role':
            const rolesList = await generateQuery.getRoleList();
            inquirer.prompt(chooseRole(rolesList)).then(generateQuery.addRole(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Add Department':
            const departmentList = await generateQuery.getDepartmentList();
            inquirer.prompt(chooseDepartment(departmentList)).then(generateQuery.addDepartment(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;
        

        case 'Update Employee Role':
            inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.updateEmployeeRole(answer)).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;

        case 'Update Employee Manager':
            // const managerList = await generateQuery.getManagerList();
            inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.updateEmployeeManager(answer)).then( () => {
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
// module.exports = employeeInfo;
