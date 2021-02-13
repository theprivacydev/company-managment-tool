

-- Attempt to display a list of all managers
SELECT first_name, last_name FROM employees WHERE manager_id = null

SELECT employees.id, CONCAT(first_name, ' ', last_name) Managers FROM employees LEFT JOIN employees m WHERE manager_id = m.id



-- Working: 

-- Displays all employees in table format
SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, m.first_name, m.last_name FROM employees LEFT JOIN employees m ON employees.id = m.id LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id

-- Returns list of first and last names of employees
SELECT CONCAT(first_name," ", last_name) Name FROM employees

-- Returns list of roles
SELECT title FROM roles
SELECT roles.id, roles.title, roles.salary FROM roles 

-- Returns all from employees
SELECT * FROM employees 


--Returns all departments
SELECT * FROM departments

