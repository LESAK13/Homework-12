var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootpass",
  database: "employee_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Update Employee Role"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          employeeSearch();
          break;

        case "Add Employee":
          addEmployee();
          break;

          case "View All Roles":
          roleSearch();
          break;

          case "Add Role":
          addRole();
          break;

          case "View All Departments":
          departmentSearch();
          break;

          case "Add Department":
          addDepartment();
          break;

          case "Update Employee Role":
          updateRole();
          break;
      }
    });
}

function employeeSearch() {
  var query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments on departments.id = roles.department_id";
  connection.query(query, function (err, res) {
    console.table(res);
    start();
  })
};

function addEmployee() {
  var query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments on departments.id = roles.department_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
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
          "Accountant",
          "Assistant Accountant",
          "Legal Team Lead",
          "Lawyer"
        ]
      },
      {
        name: "manager",
        type: "list",
        choices: function () {
          var managerArray = [];
          for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name + ' ' + res[i].last_name);
          }
          return managerArray;
        },
        message: "Who is the employee's manager?"
      }
    ]).then(function(answer) {
      if (answer.role === "Sales Lead") {
        answer.role = 1;
      } else if (answer.role === "Salesperson") {
        answer.role = 1;
      } else if (answer.role === "Lead Engineer") {
        answer.role = 2;
      } else if (answer.role === "Software Engineer") {
        answer.role = 2;
      } else if (answer.role === "Accountant") {
        answer.role = 3;
      } else if (answer.role === "Assistant Accountant") {
        answer.role = 3;
      } else if (answer.role === "Legal Team Lead") {
        answer.role = 4;
      } else if (answer.role === "Lawyer") {
        answer.role = 4;
      }; 
      var query = "INSERT INTO employees SET ?";
      connection.query(query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager: answer.manager
        },
        function(err) {
          if (err) throw err;
          console.log("Employee added successfully");
          start();
        }
      )
    })
  }
  )
};

function roleSearch() {
  var query = "SELECT roles.id, title, salary, department FROM roles LEFT JOIN departments on departments.id = roles.department_id";
  connection.query(query, function (err, res) {
    console.table(res);
    start();
  })
};

function addRole() {
  var query = "SELECT roles.id, title, salary, department FROM roles LEFT JOIN departments on departments.id = roles.department_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "role",
        type: "input",
        message: "What is the new role you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of this role?"
      },
      {
        name: "department",
        type: "list",
        message: "What department is the new role in?",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal"
        ]
      }
    ]).then(function(answer) {
      if (answer.department === "Sales") {
        answer.department = 1;
      } else if (answer.department === "Engineering") {
        answer.department = 2;
      } else if (answer.department === "Finance") {
        answer.department = 3;
      } else if (answer.department === "Legal") {
        answer.department = 4;
      };
      var query = "INSERT INTO roles SET ?";
      connection.query(query,
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("Role added successfully");
          start();
        }
      )
    })
  }
  )
};

function departmentSearch() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    console.table(res);
    start();
  })
};

function addDepartment() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of the new department?"
      }
    ]).then(function(answer) {
      var query = "INSERT INTO departments SET ?";
      connection.query(query,
        {
          department: answer.department
        },
        function(err) {
          if (err) throw err;
          console.log("Department added successfully");
          start();
        }
      )
    })
  }
  )
};

function updateRole() {
  var query = "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN departments on departments.id = roles.department_id";
  connection.query(query, function(err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "employee",
        type: "list",
        choices: function () {
          var employeeArray = [];
          for (var i = 0; i < res.length; i++) {
            var firstName = res[i].first_name;
            var lastName = res[i].last_name
            employeeArray.push(firstName + ' ' + lastName);
          }
          return employeeArray;
        },
        message: "Who would you like to update?"
      },
      {
        name: "newRole",
        type: "list",
        choices: function () {
          var roleArray = [];
          for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
          }
          return roleArray;
        },
        message: "What is their new role?"
      }
    ]).then(function(answer) {
      if (answer.newRole === "Sales Lead") {
        answer.newRole = 1;
      } else if (answer.newRole === "Salesperson") {
        answer.newRole = 2;
      } else if (answer.newRole === "Lead Engineer") {
        answer.newRole = 3;
      } else if (answer.newRole === "Software Engineer") {
        answer.newRole = 4;
      } else if (answer.newRole === "Accountant") {
        answer.newRole = 5;
      } else if (answer.newRole === "Assistant Accountant") {
        answer.newRole = 6;
      } else if (answer.newRole === "Legal Team Lead") {
        answer.newRole = 7;
      } else if (answer.newRole === "Lawyer") {
        answer.newRole = 8;
      }
      if (answer.employee === "Kevin Lesak") {
        answer.employee = 1;
      } else if (answer.employee === "Lora Lesak") {
        answer.employee = 2;
      } else if (answer.employee === "Gary Smith") {
        answer.employee = 3;
      } else if (answer.employee === "Tom Woods") {
        answer.employee = 4;
      } else if (answer.employee === "Will Fitzpatrick") {
        answer.employee = 5;
      } else if (answer.employee === "Lisa Abbott") {
        answer.employee = 6;
      } else if (answer.employee === "Denise Rodgers") {
        answer.employee = 7;
      } else if (answer.employee === "Anita Jones") {
        answer.employee = 8;
      }
      var query = "UPDATE employees SET role_id = " + answer.newRole + " WHERE employees.id = " + answer.employee
      connection.query(query,
        function(err) {
          if (err) throw err;
          console.log("Employee updated successfully");
          start();
        }
      )
    })
  }
  )
};


