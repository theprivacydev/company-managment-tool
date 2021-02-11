INSERT INTO departments (department)
VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Logistics"), ("Marketing"), ("Administration"), ("Shipping"), ("Technical Support");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Executive", 50000.00, 1), ("Engineer", 100000.00, 2), ("Accountant", 60000.00, 3), ("Data Analyst", 90000.00, 4), ("Brand Specialist", 50000.00, 5), ("Secretary", 30000.00, 6), ("Truck Driver", 70000.00, 7), ("IT Tech", 95000.00, 8);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Hammond", 1, NULL), ("Denise", "Jenkins", 2, NULL), ("Rich", "Donner", 3, 2), ("Sally", "Willis", 4, 3), ("Michelle", "Bartow", 5, 1), ("John", "Smith", 6, 2), ("Darrel", "Johnson", 7, NULL), ("Ryan", "Decker", 8, 2);