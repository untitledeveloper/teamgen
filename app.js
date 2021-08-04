const inquirer = require("inquirer");
const jest = require("jest");
const fs = require("fs");
const express = require("express");
const path = require("path");
const axios = require("axios");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
var pdf = require("html-pdf");
var options = {
  format: "Letter"
};

const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const generateHTML = require("./output/generateHTML.js");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const employees = [];
const engineers = [];
const interns = [];
const managers = [];
let id = 0;
var response;

const promtUser = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Email:",
        name: "email"
      },
      {
        type: "list",
        name: "role",
        message: "What is you position? ",
        choices: ["Manager", "Engineer", "Intern"]
      }
    ])

    .then(function(data) {
      switch (data.role) {
        case "Manager":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "Office number: ",
                name: "office"
              }
            ])
            .then(function(val) {
              const officeNum = val.office;
              console.log(officeNum);
              const manager = new Manager(
                data.name,
                val.id,
                data.email,
                officeNum,
                "Manager"
              );
              console.log(manager);
              employees.push(manager);
            }).then(function(){
              addAnother()
              });
          break;
        case "Engineer":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "Github username: ",
                name: "github"
              }
            ])
            .then(function(val) {
              const githubName = val.github;
              const engineer = new Engineer(
                data.name,
                val.id,
                data.email,
                githubName,
                "Engineer"
              );
              employees.push(engineer);
            }).then(function(){
              addAnother()
              });
          break;
        case "Intern":
           inquirer
            .prompt([
              {
                type: "input",
                message: "Employee ID: ",
                name: "id"
              },
              {
                type: "input",
                message: "School: ",
                name: "school"
              }
            ])
            .then(function(val) {
              const internSchool = val.school;
              const intern = new Intern(
                data.name,
                val.id,
                data.email,
                internSchool,
                "Intern"
              );
              employees.push(intern);
            }).then(function(){
              addAnother()
              });
          break;
      }
    })
    .then(function() {
    });
};

const addAnother = () => {
  inquirer
    .prompt([
      {
        type: "list",
      name: "add",
      message: "Would You Like To Add Another Employee?",
      choices: ["Yes", "No"]
      }
    ])
    .then(function(val) {
      if (val.add === "Yes") {
        promtUser();
      } else {
        console.log("Done");
        completedRoster(employees);
      }
    });
};

function completedRoster(employees){
    console.log("Success!");
    console.log(employees);
    const html = generateHTML(employees);
    console.log(html);
    writeFileAsync("./output/employees.html", html, "utf-8");
}

function init(){
  console.log("Please enter employee info")
  promtUser();
}

init();