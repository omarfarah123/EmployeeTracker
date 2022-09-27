const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
const chalk = require('chalk');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: 'employees_db'
    },
);

const choices = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']

function main(){
    inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: choices,
    },
  ])
  .then((response) => {
       if(response.options === 'view all departments'){
         viewAllDepartments();
       } else if(response.options === 'view all roles'){
         viewAllRoles()
       } else if(response.options === 'view all employees'){
         viewAllEmployees();
       } else if(response.options === 'add a department'){
         inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter a title for the department',
                },
            ])
            .then((response) => {
                addADepartment(response.title);
            })
       } else if(response.options === 'add a role'){
        inquirer
           .prompt([
               {
                   type: 'input',
                   name: 'title',
                   message: 'Enter a title for the role',
               },
               {
                type: 'list',
                name: 'department_id',
                message: 'choose a department id for the role',
                choices: allDepartments(),
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter a salary for the role',
                validate: function(salary){
                    if(Number(salary) === NaN){
                        console.log(chalk.red("Please enter a number")); 
                        return false;
                    } else if(Number(salary) <= 10000 || Number(salary) >= 1000001){
                        console.log(chalk.red("Please enter a salary between 10000-1000000"))
                        return false;
                    }

                    return true;
                }
            },
           ])
           .then((response) => {
                
               addARole(response.title, response.department_id, response.salary);
           })
      }
    });

}
main();



function viewAllDepartments(){
    const sql = "SELECT * FROM DEPARTMENTS;"
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(json({ error: err.message }));
           return;
        }
        console.table(rows)
        main();
      });
}

function viewAllRoles(){
    const sql = "SELECT * FROM ROLES;"
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(json({ error: err.message }));
           return;
        }
        console.table(rows)
        main()
      });
}

function viewAllEmployees(){
    const sql = "SELECT * FROM EMPLOYEES;"
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(err.message);
           return;
        }
        console.table(rows)
        main()
      });
      
}

function addADepartment(department){
    var newDepartment  = department
     const sql = `INSERT INTO DEPARTMENTS (title) VALUES ('${newDepartment.toUpperCase()}')`;
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(err.message);
           return;
        }
        console.log(chalk.green(`Succesfully added ${department} to departments`));
        main();
      });
}

function addARole(title, department_id, salary){
       
            const sql = `INSERT INTO ROLES (title, department_id, salary) VALUES ('${title}', '${department_id}', '${salary}');`
        db.query(sql, (err, rows) => {
            if (err) {
              console.log(chalk.red(err.message));
               return;
            }
            console.log(chalk.green(`Succesfully added ${title} to Roles`));
            main()
          });
        
}



function allDepartments(){
    const sql = "SELECT * FROM DEPARTMENTS;"
    const departmentsArray = []
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(json({ error: err.message }));
           return;
        }
        for(let i = 0; i < rows.length; i++){
            departmentsArray.push(rows[i].id);
        }
      });
      return departmentsArray;
}




