INSERT INTO DEPARTMENTS (title) 
VALUES ("ENGINEERING"),
("DESIGN"),
("NUCLEAR PHYSICS"),
("MARKETING"),
("HUMAN RESOURCES"),
("ACCOUNTING AND FINANCE"),
("PRODUCTION");

INSERT INTO ROLES (title, department_id, salary) 
VALUES ("CIVIL ENGINEEER", 1, 122222),
("CHEMICAL ENGINEER", 1, 100000),
("AEROSPACE ENGINEER", 1, 90000),
("GENERAL MANAGER", 5, 80000),
("ACCOUNTANT", 5, 95000),
("PRODUCT LINE TECHNICIAN", 7, 78000);

INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) 
VALUES ('MIKE', 'JONES', 1, null),
    ('JOE', 'JOHNSON', 1, 1),
    ('KEVIN', 'JONES', 1, 1),
    ('HOWARD', 'TOM', 1, 1),
    ('Nathanael', 'Wagner', 2, null),
    ('Maxwell', 'Russell', 2, 5),
    ('Aden', 'Phillips', 2, 5),
    ('Sky', 'Mendoza', 2, 5),
    ('Abu', 'Phillips', 2, 5),
    ('Abu', 'Drone', 2, 5),
    ('Muhammad', 'Farah', 3, null),
    ('Isa', 'Yusuf', 3, 11),
    ('Jama', 'Muse', 3, 11),
    ('Kyrie', 'Brad', 4, null),
    ('Octavius', 'Keeys', 4, 14),
    ('Leo', 'Simpson', 4, 14),
    ('Kobe', 'White', 4, 14),
    ('James', 'Johnson', 4, 14),
    ('Howard', 'Heavna', 5, null),
    ('Brodie', 'Georgey', 5, 19),
    ('Ismail', 'Hassan', 5, 19),
    ('Henry', 'Henryson', 5, 19),
    ('Manning', 'Peyton', 6, null),
    ('Eddie', 'Jones', 6, 23),
    ('Fowas', 'Deame', 6, 23);



