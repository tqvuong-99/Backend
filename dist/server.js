"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_helper_1 = require("./helpers/env.helper");
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = env_helper_1.env.PORT;
/// Start the server
const mongooseDbOptions = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
};
mongoose_1.default
    .connect(env_helper_1.env.MONGODB_URI, mongooseDbOptions)
    .then(() => {
    console.log("Connected to MongoDB successfully");
    //should listen app here
    app_1.default.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
});
//# sourceMappingURL=server.js.map