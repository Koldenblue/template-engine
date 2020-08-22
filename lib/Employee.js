class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
    }

    // getters to return each property
    getName = () => this.name;
    getId = () => this.id;
    getEmail = () => this.email;
    getRole = () => this.role;
}

module.exports = {
    Employee
}

// let me = new Employee("k", "Manager", "lk@lk.com", 2);

// console.log(me.getRole());
