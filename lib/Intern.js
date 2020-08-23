const { Employee } = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.role = "Intern";
    }

    getSchool = () => this.school
}


module.exports = {
    Intern
}

// let me = new Intern("k", "Intern", "lk@lk.com", 2, "UCLA");
// console.log(me);
// console.log(me.name);
// console.log(me.getName())
// console.log(me.getRole())
// console.log(me.getSchool())
// console.log(me.role)