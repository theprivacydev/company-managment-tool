SELECT CONCAT(e.first_name, ' ', e.last_name) employee, CONCAT(m.first_name, ’ ’, m.last_name) manager, e.id
        FROM employee m
        JOIN employee e ON e.manager_id = m.id
        ORDER BY e.id ASC;


-- Attempt to display all employees (including manager column)
SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
        FROM employee m
        JOIN employee e ON e.manager_id = m.employee_id
        JOIN role
        ON e.role_id = role.role_id
        JOIN department
        ON department.department_id = role.department_id
        ORDER BY e.employee_id ASC;


-- Attempt to display a list of all managers
SELECT first_name, last_name FROM employees WHERE manager_id = null

INSERT INTO employees VALUE (first_name, last_name, role_id, manager_id) VALUES (?), (?), (?), (?)





-- Working: 

-- Displays all employees in table format
SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, m.first_name, m.last_name FROM employees LEFT JOIN employees m ON employees.id = m.id LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id

-- Returns list of first and last names of employees that can be pushed to array
SELECT CONCAT(first_name," ", last_name) Name FROM employees

-- Returns list of roles
SELECT title FROM roles


SELECT * FROM employees 