import testModel from "../models/test.model";


const newTest = new testModel ({
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
    birthDay: new Date("1989-12-31"),
    address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA"
    },
    roles: ["Admin", "User"]
 });

 //Save
 newTest.save();