const { Manager } = require("./lib/Manager");
const { Engineer } = require("./lib/Engineer");
const { Intern } = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// joins output folder with pwd
const OUTPUT_DIR = path.resolve("output");
console.log(OUTPUT_DIR)
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { ENOENT } = require("constants");

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
    }
];

const officeQuestion = [
    {
        type: "number",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];



const employeeQuestions = [
    {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Engineer", "Intern"]
    },
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
    }
];

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "What school has the employee most recently attended?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "What is the employee's GitHub username?"
    }
];

const continueQuestion = [
    {
        type: "confirm",
        name: "continue",
        message: "Would you like to continue entering employees?"
    }
];

/** Asks questions about the manager. Will only accept numbers for office number, else it repeats the question. */
async function askManagerQuestions(employeesArr) {
        // manager questions first
        const managerAnswers = await inquirer.prompt(managerQuestions);
        console.log(managerAnswers);
        while (true) {
            // use var, so that scope is outside of while loop
            var officeAnswer = await inquirer.prompt(officeQuestion);
            console.log(officeAnswer)
            if (isNaN(officeAnswer.officeNumber)) {
                console.log("A number must be entered for the office! Try again!");
                continue;
            }
            break;
        }
        // create a new Manager obj and push into the employees array, to be used in renderer function
        let managerEmployee = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, officeAnswer.officeNumber);
        employeesArr.push(managerEmployee);
        return employeesArr;
}

async function main() {
    let employees = [];
    try {
        employees = await askManagerQuestions(employees);

        console.log(employees);

        // Employee questions next. keep asking about new employees until user elects not to continue
        while (true) {
            const employeeAnswers = await inquirer.prompt(employeeQuestions);
            console.log(employeeAnswers);

            // ask different questions and create diff object, depending on role selected
            if (employeeAnswers.role === "Intern") {
                const internAnswer = await inquirer.prompt(internQuestions);
                console.log(internAnswer);
                // create a new employee obj using the appropriate class
                let internEmployee = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, internAnswer.school);
                employees.push(internEmployee);
            }
            else {
                const engineerAnswer = await inquirer.prompt(engineerQuestions);
                console.log(engineerAnswer);
                let engiEmployee = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, engineerAnswer.github);
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
        let teamHtml = render(employees);

        fs.writeFile(outputPath, teamHtml, function(error) {
            if (error && error.code === "ENOENT") {
                // if the output folder does not exist, create it and try writing again
                fs.mkdir(OUTPUT_DIR, err => {if (err) throw err});
                fs.writeFile(outputPath, teamHtml, err => {if (err) throw err});
            }
            else if (error) {
                throw error;
            }
        })
        console.log("done");
    }
    catch (error) {
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


// TODO: use path __dirname for output
// more validation for email, etc.
// correct grid system so that columns are functional beyond team of 6
// add in note that only one manager is accepted
// update css styles
// add in N/A for when input is blank



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
