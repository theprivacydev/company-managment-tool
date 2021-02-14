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

// Create first user prompt
const firstPrompt = 
    {
        name: 'interaction',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Roles',
            'View All Departments',
            'Add Employee',
            // 'Remove Employee',
            'Add Role',
            // 'Remove Role',
            'Add Department',
            'Update Employee Role',
            // 'Update Employee Manager',
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

const insertRoleInfo = (departments) => [
    {
        name: 'role',
        type: 'input',
        message: 'Please type out the name of the role you would like to add.',
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Please enter a number for the Salary of this role.',
    },
    {
        name: 'department',
        type: 'list',
        message: 'Please choose the Department this role will be entered into.',
        choices: departments.map(department => ({name: department.department, value: department.id}))
    }
]

const insertDepartmentInfo = () => [

    {
        name: 'department',
        type: 'input',
        message: 'Please type out the name of the department you would like to add.',
    },

]

const chooseRole = (rolesList) => [
{
    name: 'chooseRole',
    type: 'list',
    message: 'Please choose the role you would like to edit for this action.',
    choices: rolesList.map(role => ({name: role.title, value: role.id}))
}
]

const chooseDepartment = (departmentList) => [
    {
        name: 'chooseDepartment',
        type: 'list',
        message: 'Choose the department you would like to add.',
        choices: departmentList.map(d => ({name: d.department, value: d.id}))
    }
];


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
        choices: managerList.map(manager => ({name: manager.Managers, value: manager.id}))
    }
];

const updateRoleInfo = (employeeList, rolesList) => [
    chooseEmployee(employeeList),
    chooseRole(rolesList)
]


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

        case 'View All Roles':
            generateQuery.getRoleList().then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer)
            });
            break;

        case 'View All Departments':
            generateQuery.getDepartmentList().then( () => {
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

        // case 'Remove Employee':
        //     const employeeList = await generateQuery.getEmployeeList();
        //     inquirer.prompt(chooseEmployee(employeeList)).then(generateQuery.removeEmployeeFromDatabase(answer)).then( () => {
        //         inquirer.prompt(firstPrompt).then(handleAnswer);
        //     });
        //     break;

        case 'Add Role':
            const departments = await generateQuery.getDepartmentList();
            inquirer.prompt(insertRoleInfo(departments)).then(generateQuery.addRole).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
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
            inquirer.prompt(insertDepartmentInfo()).then(generateQuery.addDepartment).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
            });
            break;
        

        case 'Update Employee Role':
            const employee = await generateQuery.getEmployeeList();
            const role = await generateQuery.getRoleList();
            inquirer.prompt(updateRoleInfo(employee, role)).then(generateQuery.updateEmployeeRole).then( () => {
                inquirer.prompt(firstPrompt).then(handleAnswer);
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


// What I would try for that one- is build an employee object - using all the values you collected then pass that into a separate function that handles the createEmployee and takes in an object --> using
// this.connection.promise().query("INSERT INTO employee SET ?", employee);
// Where employee is the object with the properties on it



// Export necessary modules to be required in generateQuery.js
module.exports = connection;
// module.exports = employeeInfo;
