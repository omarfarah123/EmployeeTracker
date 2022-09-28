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
                    validate: function(title){
                        if(title.trim().length === 0){
                            console.log(chalk.red(" Please enter a valid title"));
                            return false;
                        }
                        return true;
                       }
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
                   validate: function(title){
                    if(title.trim().length === 0){
                        console.log(chalk.red(" Please enter a valid title"));
                        return false;
                    }
                    return true;
                   }
               },
               {
                type: 'list',
                name: 'department',
                message: 'choose a department for the role',
                choices: departmentTitles(),
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter a salary for the role',
                validate: function(salary){
                    if(containsAnyLetters(Number(salary))){
                        console.log(chalk.red(" Please enter a number")); 
                        return false;
                    } else if(Number(salary) <= 10000 || Number(salary) >= 1000001){
                        console.log(chalk.red(" Please enter a salary between 10000-1000000"))
                        return false;
                    }

                    return true;   
                }
            },
           ])
           .then((response) => {
            const sql = `SELECT id FROM DEPARTMENTS WHERE title = "${response.department}";`
            db.query(sql, (err, rows) => {
                if (err) {
                  console.log(chalk.red(err.message));
                  return;
                }
                addARole(response.title, rows[0].id, response.salary);
              });
               
           })
      } else if(response.options === "add an employee"){
        
        inquirer
            .prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'Enter the first name for the employee',
                        validate: function(first_name){
                         if(first_name.trim().length === 0){
                             console.log(chalk.red(" Please enter a valid name"));
                             return false;
                         }
                         return true;
                        }
                    }, 
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'Enter the last name for the employee',
                        validate: function(last_name){
                         if(last_name.trim().length === 0){
                             console.log(chalk.red(" Please enter a valid name"));
                             return false;
                         }
                         return true;
                        }
                    }, 
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Choose a role for the employee',
                        choices: roleTitles()
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Choose a manager for the employee',
                        choices: employeeNames()
                    },
            ])
            .then((response) => {
               
                const sql = `SELECT id FROM ROLES WHERE title = "${response.role}";`
                db.query(sql, (err, rows) => {
                    if (err) {
                      console.log(chalk.red(err.message));
                      return;
                    }
                    const roleId = rows[0].id;
                    console.log(`Inside DB query roleID${roleId}`);

                    if(response.manager === "No Manager"){
                        addAnEmployee(response.first_name.toUpperCase(), response.last_name.toUpperCase(), roleId, null)
                    } else {
                        console.log(typeof response.manager)
                        const sql2 = `SELECT id FROM EMPLOYEES WHERE CONCAT(first_name, ' ',last_name) = '${response.manager}';`
                        db.query(sql2, (err, rows1) => {
                            if (err) {
                              console.log(chalk.red(err.message));
                              return;
                            }
                             const managerId = rows1[0].id;
                             console.log(`Inside Db query managerID${managerId}`);
                             addAnEmployee(response.first_name.toUpperCase(), response.last_name.toUpperCase(), roleId, managerId)
                          });
                    }

                  });

              console.log(roleId);
              console.log(managerId);
              addAnEmployee(response.first_name.toUpperCase(), response.last_name.toUpperCase(), );
            })
      } else if(response.options === "update an employee role"){
        
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an employee',
                    choices: employeeNames()
                },
                {
                    type : "list",
                    name : "manager",
                    message : "update manager for the employee",
                    choices: employeeNames()
                },
            ])
            .then((response) => {
                const sql = `SELECT id FROM EMPLOYEES WHERE CONCAT(first_name, ' ',last_name) = ${response.employee}`
                db.query(sql, (err, rows) => {
                    if(err){
                        console.log(chalk.red(err.message))
                    } else {
                        let employeeId = rows[0].id;
                        db.query(sql, (err, rows) => {
                            if(err){
                                console.log(chalk.red(err.message));
                            } else {
                                let updatedManagerId = rows[0].id; 
                                employeeRoles(employeeId, updatedManagerId);
                            }
                        })
                    }
                })
            })
      }
    });

}




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
       
            const sql = `INSERT INTO ROLES (title, department_id, salary) VALUES ('${title.toUpperCase()}', ${department_id}, ${salary});`
        db.query(sql, (err, rows) => {
            if (err) {
              console.log(chalk.red(err.message));
               return;
            }
            console.log(chalk.green(`Succesfully added ${title} to Roles`));
            main();
          });
        
}

function addAnEmployee(first_name, last_name, role_id, manager_id){
    const sql = `INSERT INTO EMPLOYEES (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`
    db.query(sql, (err, rows) => {
        if (err) {
          console.log(chalk.blue(err.message));
           return;
        }
        console.log(chalk.green(`Succesfully added ${first_name} ${last_name} to Employees`));
        main();
      });
}



function departmentTitles(){
    const sql = "SELECT title FROM DEPARTMENTS;"
    const departmentTitles = [];
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(chalk.red(err.message));
            return;
        }
        for(let i = 0; i < rows.length; i++){
            departmentTitles.push(rows[i].title);
        }
      });
      return departmentTitles;
}



function roleTitles(){
    const sql = "SELECT title FROM ROLES;"
    const roleTitles = [];
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(chalk.red(err.message));
            return;
        }
        for(let i = 0; i < rows.length; i++){
            roleTitles.push(rows[i].title);
        }
      });
      return roleTitles;
}

function employeeRoles(employeeId, roleId){
    const sql = `UPDATE EMPLOYEES SET role_id = ${roleId} WHERE id = ${employeeId};`
    db.query(sql, (err, rows) => {
        if(err){
            console.log(chalk.red(err.message));
        } else {
            console.log("Updated Role")
        }
    })
}



const employeeNames = () => {
    const sql = "SELECT * FROM EMPLOYEES;"
    const employeeNames = [];
    db.query(sql, (err, rows) => {
        if(err){
            console.log(chalk.red(err.message))
            return;
        } else {
            for(let i = 0; i < rows.length; i++){
                employeeNames.push(`${rows[i].first_name} ${rows[i].last_name}`);
            }
            employeeNames.push("No Manager");
        }
    })
    return employeeNames;
}



function containsAnyLetters(str) {
    return /[a-zA-Z]/.test(str);
  }



  main();