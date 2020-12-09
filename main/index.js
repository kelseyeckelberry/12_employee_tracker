const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "employeeTracker_db"
});

connection.connect(function(err) {
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
        ]
      })
      .then(function(answer) {
        switch (answer.action){
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
};

function addData(dataName) {

};

function viewDB(dataName) {

};

function updateData(dataName) {

};

