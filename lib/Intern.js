const { Employee } = require("./Employee");

class Intern extends Employee {
    constructor(name, role, email, id, school) {
        super(name, role, email, id);
        this.school = school;
    }

    getSchool = () => this.school
}

let me = new Intern("k", "Intern", "lk@lk.com", 2, "UCLA");


console.log(me.getRole())
console.log(me.getSchool())