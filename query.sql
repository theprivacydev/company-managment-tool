SELECT CONCAT(e.first_name, ' ', e.last_name) employee, CONCAT(m.first_name, ’ ’, m.last_name) manager, e.id
        FROM employee m
        JOIN employee e ON e.manager_id = m.id
        ORDER BY e.id ASC;

SELECT e.employee_id, e.first_name, e.last_name, role.title, department.department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
        FROM employee m
        JOIN employee e ON e.manager_id = m.employee_id
        JOIN role
        ON e.role_id = role.role_id
        JOIN department
        ON department.department_id = role.department_id
        ORDER BY e.employee_id ASC;


SELECT first_name, last_name FROM employees WHERE manager_id = null






-- Working: 

SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id

SELECT first_name, last_name FROM employees

SELECT title FROM roles