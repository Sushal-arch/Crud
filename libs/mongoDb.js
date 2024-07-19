// import mongoose from "mongoose";

// export async function connectToDatabase() {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       const { connection } = await mongoose.connect(process.env.MONGO, {
//         dbName: "crud_db",
//       });
//       console.log("Database connection established");
//       console.log(connection);
//     }
//   } catch (error) {
//     console.error("Error connecting to database:", error);
//     throw new Error("Error connecting to database");
//   }
// }

import mongoose from "mongoose";

import React from "react";

export default async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Error connecting to database");
  }
}
