"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    name: String,
    age: Number,
    email: String,
    birthDay: Date,
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    roles: [String] //roles: ['Admin', 'User']
});
exports.default = (0, mongoose_1.model)('Test', testSchema);
//# sourceMappingURL=test.model.js.map