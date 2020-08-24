const path = require("path");
const fs = require("fs");

// get the absolute path of the templates dir
const templatesDir = path.resolve(__dirname, "../templates");

/** Pushes to an array named html. Each employee is mapped to a template
 * and pushed, filtered in order by role. */
const render = employees => {
  const html = [];

  // spread operator - since each element in employees array is an object
  html.push(...employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  // adding in rows to make template more mobile responsive
  mobileHtml = [];
  for (let i = 0, j = html.length; i < j; i++) {
    // add on a row in front of employees
    if (i === 0) {
      mobileHtml.push("<div class='row justify-content-center'>");
    }
    // if at the third employee (or i % 3 === 0), but not at the last employee, end the row and add a new row
    if (i > 0 && i % 3 === 0 && j - i > 1 && j > 2) {
      mobileHtml.push("</div><div class='row justify-content-center'>");
    }
    // push each employee to the mobile array, in between rows
    mobileHtml.push(html[i]);
  }

  // if at the last employee, end the row
  mobileHtml.push("</div>")

  return renderMain(mobileHtml.join(""));
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
