const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        //"View All Employees",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "View Employees",
        "View Departments",
        "View Roles",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add Employee":
          addData("employee");
          break;
        case "Add Department":
          addData("department");
          break;
        case "Add Role":
          addData("role");
          break;
        case "View Employees":
          viewDB("employee");
          break;
        case "View Departments":
          viewDB("department");
          break;
        case "View Roles":
          viewDB("role");
          break;
        case "Update Employee Role":
          updateData("___");
          break;

        default:
          break;
      }
    });
}

function addData(dataName) {
  if (dataName === "employee") {
    inquirer
      .prompt([
        {
          name: "first",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee's role?",
          choices: [
            "Sales Lead",
            "Salesperson",
            "Lead Engineer",
            "Software Engineer",
            "Account Manager",
            "Accountant",
            "Legal Team Lead",
            "Lawyer",
          ],
        },
        {
          name: "manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: [
            "John Doe",
            "Mike Chan",
            "Ashley Rodriguez",
            "Kevin Tupik",
            "Kunal Singh",
            "Malia Brown",
            "Sarah Lourd",
            "Tom Allen",
          ],
        },
      ])
      .then(function (data) {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first}", "${data.last}", "${data.role}", "${data.manager}")`;

        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log("The employee was created!");
          start();
        });
      });
  } else if (dataName === "department") {
    inquirer
      .prompt({
        name: "deptName",
        type: "input",
        message: "What is the department's name?",
      })
      .then(function (data) {
        const query = `INSERT INTO department (name) VALUES ("${data.deptName}")`;

        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log("The department was created!");
          start();
        });
      });
  } else if (dataName === "role") {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the new title?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary?",
        },
        {
          name: "dept",
          type: "list",
          message: "What is the department?",
          choices: [
            "Sales",
            "Engineering",
            "Finance",
            "Legal",
          ]
        },
      ])
      .then(function (data) {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", "${data.dept}")`;

        connection.query(query, (err, res) => {
          if (err) throw err;
          console.log("The role was created!");
          start();
        });
      });
  }
}

function viewDB(dataName) {
    const query = `SELECT * FROM ${dataName}`;

    connection.query(query, (data) => {
        if (dataName == "employee") {
            console.log("<<<<<< EMPLOYEES >>>>>>");
            console.log("id \t first_name \t last_name \t role_id \t manager_id");
            data.forEach(result => {

                console.log(result.id + "\t" + result.first_name + "\t\t" + result.last_name + "\t\t" + result.role_id + "\t\t" + result.manager_id);
            });

        }
        else if (dataName == "department") {
            console.log("<<<<<< DEPARTMENTS >>>>>>");
            console.log("id \t name");
            data.forEach(result => {
                console.log(result.id + "\t" + result.name);
            });

        }
        else if (dataName == "role") {
            console.log("<<<<<< ROLES >>>>>>");
            console.log("id \t title \t \t salary \t department_id");
            data.forEach(result => {
                console.log(result.id + "\t" + result.title + "\t\t" + result.salary + "\t\t" + result.department_id);
            });
        }
    });
};

// function updateData(dataName) {

// };
