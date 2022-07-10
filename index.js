const inquirer = require("inquirer");
const db = require("./config/connection");
const cTable = require("console.table");

// function for initial user input 

const userInput = async () => {
    const startMenu = await inquirer.prompt({
        type: "list",
        message: "What would you like to do? \n",
        name: "chooseAction",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees from Manager ID",
            "Add A Department",
            "Add A Role",
            "Add An Employee",
            "Update An Employee Role",
            "Update An Employee Manager",
            "Quit"
        ]
    });
    return startMenu.chooseAction;
};

// function for View All * options, 

const viewAll = (userSelection) => {
    switch (userSelection) {
        case "View All Departments":
            var sql = "SELECT * FROM department";
            break;
    }
    switch (userSelection) {
        case "View All Roles":
            var sql = "SELECT * FROM roles";
            break;
    }
    switch (userSelection) {
        case "View All Employees":
            var sql = "SELECT * FROM employee";
            break;
    }
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(rows);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
}
const viewEmpViaMananger = async () => {
    const empInfo = await inquirer.prompt({
        type: "number", 
        name: "managerID",
        message: "Enter the manager ID to see a list of their team."
    });
    const sql = `SELECT * FROM employee WHERE manager_id=?`
    const params = [empInfo.managerID];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(result);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
}

// function for adding a department

const addDept = async () => {
    const departmentInfo = await inquirer.prompt({
        type: "input",
        name: "departmentName",
        message: "Tell us what department you would like to add."
    });
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [departmentInfo.departmentName]
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log (`${departmentInfo.departmentName} was added to Department`)
        }
    })
}

// function for adding a role to the database

const addRole = async () => {
    const roleInfo = await inquirer.prompt([
        {
            type: "input",
            name: "roleName",
            message: "What is the role title?"
        },
        {
            type: "number",
            name: "roleSalary",
            message: "What is the salary for this role?"
        },
        {
            type: "number",
            name: "departmentID",
            message: "What Department ID is this role listed under?"
        },
    ]);
    const sql = `INSERT INTO roles (role_title, role_salary, department_id)
    VALUES (?,?,?)`;
    const params = [
        roleInfo.roleName,
        roleInfo.roleSalary,
        roleInfo.departmentID
    ];
    db.query(sql,params,(err,result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(result);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
};

// function for adding an employee to thew database

const addEmployee = async () => {
    const employeeInfo = await inquirer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "What is the first name of the employee?"
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "What is the last name of the employee?"
        },
        {
            type: "number",
            name: "employeeRoleID",
            message: "What is the ID for this employee role?"
        },
        {
            type: "number",
            name: "employeeManagerID",
            message: "What is the employee ID of this employees manager?"
        }
    ]);
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`
    const params = [
        employeeInfo.employeeFirstName,
        employeeInfo.employeeLastName,
        employeeInfo.employeeRoleID,
        employeeInfo.employeeManagerID
    ];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(result);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
};

//  function for updating an employee

const updateEmployee = async () => {
    const employeeUpdated = await inquirer.prompt([
        {
            type: "number",
            name: "employeeID",
            message: "What is the ID of the employee you would like to update?"
        },
        {
            type: "number",
            name: "newRoleID",
            message: "What is the ID of their new role?"
        }
    ]);
    const sql = `UPDATE employee SET role_id=? WHERE id=?`
    const params = [
        employeeUpdated.newRoleID,
        employeeUpdated.employeeID
    ];
    db.query(sql, params, (err,result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(result);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
};

// function to update employee manager
const empManagerUpdate = async () => {
    const empManUpdates = await inquirer.prompt ([
    {
        type: "number",
        name: "empID",
        message: "What is the ID of the employee you would like to update?"
    }, 
    {
        type: "number",
        name: "managerID",
        message: "What is the ID of the new manager?"  
    }
    ]);
    const sql = `UPDATE employee SET manager_id=? WHERE id=?`
    const params = [
        empManUpdates.managerID,
        empManUpdates.empID
    ];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            console.log("\n");
            console.table(result);
            console.log("Press Up or Down Arrow to select and Enter to confirm!");
        }
    });
};

// initialization function

const init = async () => {
    let exit = false;
    while (exit === false) {
        let initialChoice = await userInput();
        if (initialChoice === "Quit") {
            exit = true;
            return quit();
        } else if (
            initialChoice === "View All Departments" ||
            initialChoice === "View All Roles" ||
            initialChoice === "View All Employees"
            ) {
            viewAll(initialChoice);
        } else if (initialChoice === "View Employees from Manager ID") {
            let = empByManager = await viewEmpViaMananger();
        } else if (initialChoice === "Add A Department") {
            let departmentAdded = await addDept();
        } else if (initialChoice === "Add A Role") {
            let roleAdded = await addRole();
        } else if (initialChoice === "Add An Employee") {
            let employeeAdded = await addEmployee();
        } else if (initialChoice === "Update An Employee Role") {
            let employeeUpdated = await updateEmployee();
        } else if (initialChoice === "Update An Employee Manager") {
            let empManagerUpdated = await empManagerUpdate();
        }
    }
};

const quit = () => {
    process.exit();
};

init();