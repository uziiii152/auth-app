import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "test";

export default async function connect() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is missing in .env");
    throw new Error("❌ MONGODB_URI is missing in .env");
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName, // Specify the database name
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to application termination");
  process.exit(0);
});