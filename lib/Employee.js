class Employee {
    constructor (name, role, email, id) {
        this.name = name;
        this.role = role;
        this.email = email;
        this.id = id;
    }

    // getters to return each property
    getRole = () => this.role;
    getName = () => this.name;
    getEmail = () => this.email;
    getId = () => this.id;
}

module.exports = {
    Employee
}

// let me = new Employee("k", "Manager", "lk@lk.com", 2);

// console.log(me.getRole());
