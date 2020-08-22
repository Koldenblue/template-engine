const { Employee } = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school, role) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }

    getSchool = () => this.school
}

let me = new Intern("k", "Intern", "lk@lk.com", 2, "UCLA");

module.exports = {
    Intern
}

// console.log(me.getRole())
// console.log(me.getSchool())
// console.log(me.role)