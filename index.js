// WHEN I start the application THEN I am presented with the following options: 
// view all departments, view all roles, view all employees, add a department, 
// add a role, add an employee, and update an employee role
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const cTable = require("console.table");
const db = mysql2.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employees",
  },
  console.log("Connected to the employee database")
);

const userChoice = async () => {
  const mainMenu = await inquirer.prompt({
    type: "list",
    message: "What would you like to do?: \n",
    name: "chooseAction",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ],
  });
  return mainMenu.chooseAction;
};

const viewDepartment = () => {
  const sql = "SELECT * FROM ?";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.log("\n");
      console.table(rows);
    }
  });
};

const init = async () => {
  const exit = false;
  while (exit === false) {
    let initialChoice = await userChoice();
    if (initialChoice === "Quit") {
      exit = true;
      return;
    } else if (initialChoice === "View All Departments") {
      viewDepartment();
    }
  }
};

init();