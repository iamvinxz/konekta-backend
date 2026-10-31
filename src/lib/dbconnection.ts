import { prisma } from "./prisma.js";

const dbConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1);
  }
};

export default dbConnection;
