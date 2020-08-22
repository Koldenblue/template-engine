const { Manager } = require("./lib/Manager");
const { Engineer } = require("./lib/Engineer");
const { Intern } = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// can put validation in
// validate: function (value) {
//     let regex = /@/
//     let valid = regex.test(value)
//     return valid || 'Please enter a valid email'
// }
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the manager's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the manager's email address?"
    },
    {
        type: "number",
        name: "officeNumber",
        message: "What is the manager's office number?",
    },
]


const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    },
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Engineer", "Intern"]
    },
]

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "What school has the employee most recently attended?"
    }
]

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "What is the employee's GitHub username?"
    }
]

const continueQuestion = [
    {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue entering employees?"
    }
]


async function main() {
    let employees = [];
    try {
        // manager questions first
        const managerAnswers = await inquirer.prompt(managerQuestions);
        console.log(managerAnswers);
        // create a new Manager obj and push into the employees array, to be used in renderer function
        let managerEmployee = new Manager(managerAnswers.name, managerAnswers.role, managerAnswers.email, managerAnswers.id, managerAnswers.officeNumber);
        employees.push(managerEmployee);
        console.log(employees);

        // if (isNaN(managerAnswers.officeNumber)) {
        //     // could prob continue here or validate instead
        //     throw new Error("office must be a number!");
        // }

        // Employee questions next. keep asking about new employees until user elects not to continue
        while (true) {
            const employeeAnswers = await inquirer.prompt(employeeQuestions);
            console.log(employeeAnswers);

            // ask different questions and create diff object, depending on role selected
            if (employeeAnswers.role === "Intern") {
                const internAnswer = await inquirer.prompt(internQuestions);
                console.log(internAnswer);
                // create a new employee obj using the appropriate class
                let internEmployee = new Intern(internAnswer.name, internAnswer.role, internAnswer.email, internAnswer.id, internAnswer.school);
                employees.push(internEmployee);
            }
            else {
                const engineerAnswer = await inquirer.prompt(engineerQuestions);
                console.log(engineerAnswer);
                let engiEmployee = new Engineer(engineerAnswer.name, engineerAnswer.role, engineerAnswer.email, engineerAnswer.id, engineerAnswer.github);
                employees.push(engiEmployee);
            }

            // ask if user would like to continue entering employee info
            let willContinue = await askContinue();
            console.log(willContinue);
            if (!willContinue) {
                break;
            }
        }
        console.log(employees);
        console.log(render(employees));
        // TODO render all employees
        console.log("done");
    } catch (error) {
        console.log("You have erred.")
        console.log(error);
    }
}

async function askContinue() {
    try {
        const continueAnswer = await inquirer.prompt(continueQuestion);
        console.log(continueAnswer);
        return continueAnswer.continue;
    }
    catch (error) {
        console.log("oops, continue function failed.");
    }
}


main();
// can also save employee objects in local storage - in browser
// employees should each be constructed as objects by their constructors


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
