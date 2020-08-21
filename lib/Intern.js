const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, role, email, id, school) {
        super(name, role, email, id);
        this.school = school;
    }
}