import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
const Flutterwave = require("flutterwave-node-v3");
import { connectDB } from "./config/db";
import payRoutes from "./routes/payRoutes";
import validateRoutes from "./routes/validateRoutes";

dotenv.config();
const app = express();

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
const port = 4000;
connectDB();

app.use(bodyParser.json());

app.use("/api", payRoutes);
app.use("/api", validateRoutes);

app.listen(port, () => {
  console.log(`server at port ${port}`);
});
