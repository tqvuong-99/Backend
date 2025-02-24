"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_model_1 = __importDefault(require("../models/test.model"));
const newTest = new test_model_1.default({
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
//# sourceMappingURL=seed.js.map