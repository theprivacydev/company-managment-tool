// Object of inquirer prompts to be used in index.js switch statement:

const user = {


    // Create first user prompt
    firstPrompt:
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
    },



    // Creates inquirer prompt that allows user to choose from list of employees

    chooseEmployee: (employeeList) => [
            {
                name: 'chooseEmployee',
                type: 'list',
                message: 'Which employee would you like to choose for this action?',
                choices: employeeList.map(employee => ({ name: employee.name, value: employee.id }))

            },
        ],

    insertRoleInfo: (departments) => [
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
            choices: departments.map(department => ({ name: department.department, value: department.id }))
        }
    ],

    insertDepartmentInfo: () => [

        {
            name: 'department',
            type: 'input',
            message: 'Please type out the name of the department you would like to add.',
        },

    ],

    chooseRole: (rolesList) => [
        {
            name: 'chooseRole',
            type: 'list',
            message: 'Please choose the role you would like to edit for this action.',
            choices: rolesList.map(role => ({ name: role.title, value: role.id }))
        }
    ],

    chooseDepartment: (departmentList) => [
        {
            name: 'chooseDepartment',
            type: 'list',
            message: 'Choose the department you would like to add.',
            choices: departmentList.map(d => ({ name: d.department, value: d.id }))
        }
    ],


    // Create employee info prompts
    employeeInfo: (roleList, managerList) =>
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
                choices: roleList.map(role => ({ name: role.title, value: role.id }))
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Who is the employee\'s Manager?',
                choices: managerList.map(manager => ({ name: manager.Managers, value: manager.id }))
            }
        ],

    updateRoleInfo: function(employeeList, rolesList) {
        return [
            this.chooseEmployee(employeeList)[0],
            this.chooseRole(rolesList)[0]
        ]
    }

}

module.exports = user;