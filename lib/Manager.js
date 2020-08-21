const Employee = require("./Employee");


class Manager extends Employee {
    constructor(name, role, email, id, officeNumber) {
        super(name, role, email, id);
        this.officeNumber = officeNumber;
    }
}