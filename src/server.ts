import app from './app';
import {env} from "./helpers/env.helper";
import mongoose from 'mongoose';
const PORT = env.PORT;

/// Start the server
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose
  .connect(env.MONGODB_URI as string, mongooseDbOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    //should listen app here
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });
  


  