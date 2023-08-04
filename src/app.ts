import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
// import payRoutes from "./routes/payRoutes";
// import validateRoutes from "./routes/validateRoutes";
// import tokenizedRoutes from "./routes/tokenizedRoutes";
// import verifyRoutes from "./routes/verifyRoutes";
// import authroizeRoutes from "./routes/authroizeRoutes";
import cardRoutes from "./routes/cardRoutes";

dotenv.config();
const app = express();


//const port = 4000;
connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/card", cardRoutes);



// app.listen(port, () => {
//   console.log(`server at port ${port}`);
// });


export default app;
