const { Employee } = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getOfficeNumber = () => this.officeNumber;
}

module.exports = {
    Manager
}


// console.log(typeof(Manager))
// let me = new Manager(new Intern("ahh", "adsf", "123"), 'testValue');
// console.log(me.name);
// console.log(me.id);
// console.log(me.email);
// console.log(me.officeNumber);
// console.log(me.role);
// // console.log(me);