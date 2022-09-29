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
    ('PAT', 'WAGNER', 2, null),
    ('KATE', 'RUSSEL', 2, 5),
    ('ADEN', 'PHILLIPS', 2, 5),
    ('SKY', 'MENDOZA', 2, 5),
    ('ABU', 'PHILLIPS', 2, 5),
    ('ABU', 'DRONE', 2, 5),
    ('MUHAMMAD', 'FARAH', 3, null),
    ('AMBER', 'YOLK', 3, 11),
    ('JAMA', 'MUSE', 3, 11),
    ('KYRIE', 'SIMMONS', 4, null),
    ('JA', 'KEEYS', 4, 14),
    ('LEO', 'SIMPSON', 4, 14),
    ('KOBE', 'WHITE', 4, 14),
    ('JAMES', 'JOHNSON', 4, 14),
    ('HOWARD', 'HEAVANA', 5, null),
    ('BRODIE', 'GEORGEY', 5, 19),
    ('ISMAIL', 'HASSAN', 5, 19),
    ('HENREY', 'HENRYSON', 5, 19),
    ('MANNING', 'PEYTON', 6, null),
    ('EDDIE', 'JONES', 6, 23),
    ('CONNOR', 'STACKHOUSE', 6, 23)
    ('PATTY', 'BROWN', 4, null);



