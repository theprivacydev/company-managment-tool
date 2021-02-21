const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Query = require('./model/queryGenerator.js');
const user = require('./user.js');

// Establish connection with database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root4',
    database: 'companymanagementtooldb'
});


// Initiate connection and initiate app by calling first inquirer prompts
connection.connect((err) => {
    if (err) throw err.stack;
    console.log(connection.threadId);
    startCompanyReview();
});

// Create the ability to generate a query using the other js file
const generateQuery = new Query(connection);

// Start application by starting the first inquirer prompt
function startCompanyReview() {
    inquirer.prompt(user.firstPrompt).then(handleAnswer);
}


// Display data based on user choice
const handleAnswer = async (answer) => {
    switch (answer.interaction) {
        case 'View All Employees':
             generateQuery.displayAllEmployees().then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

        case 'View All Roles':
            generateQuery.getRoleList().then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

        case 'View All Departments':
            generateQuery.getDepartmentList().then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

    
        case 'Add Employee': 
            let roleList = await generateQuery.getRoleList();
            const managerList = await generateQuery.getManagerList();
            inquirer.prompt(user.employeeInfo(roleList, managerList)).then(generateQuery.addEmployeeToDatabase).then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

        // case 'Remove Employee':
        //     const employeeList = await generateQuery.getEmployeeList();
        //     inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.removeEmployeeFromDatabase(answer)).then( () => {
        //         inquirer.prompt(firstPrompt).then(handleAnswer);
        //     });
        //     break;

        case 'Add Role':
            const departments = await generateQuery.getDepartmentList();
            inquirer.prompt(user.insertRoleInfo(departments)).then(generateQuery.addRole).then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

        // case 'Remove Role':
        //     const rolesList = await generateQuery.getRoleList();
        //     inquirer.prompt(chooseRole(rolesList)).then(generateQuery.removeRole).then( () => {
        //         inquirer.prompt(firstPrompt).then(handleAnswer);
        //     });
        //     break;

        case 'Add Department':
            // const departmentList = await generateQuery.getDepartmentList();
            inquirer.prompt(user.insertDepartmentInfo()).then(generateQuery.addDepartment).then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;
        

        case 'Update Employee Role':
            const employee = await generateQuery.getEmployeeList();
            const role = await generateQuery.getRoleList();
            inquirer.prompt(user.updateRoleInfo(employee, role)).then(generateQuery.updateEmployeeRole).then( () => {
                inquirer.prompt(user.firstPrompt).then(handleAnswer);
            });
            break;

        // case 'Update Employee Manager':
        //     // const managerList = await generateQuery.getManagerList();
        //     inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.updateEmployeeManager(answer)).then( () => {
        //         inquirer.prompt(firstPrompt).then(handleAnswer);
        //     });
        //     break;

        case 'I\'m Done':
            console.log('Thanks for using the Company Management Tool! Have a Nice Day!');
            connection.end();
            break;
    }
}


// Export necessary modules to be required in generateQuery.js
module.exports = connection;

