import "dotenv/config";
import router from "@/routers/main.js";
import express from "express";
import dbConnection from "@/lib/dbconnection.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, (): void => {
  console.log(`Running on port ${PORT}`);
});
