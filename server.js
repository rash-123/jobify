import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParse from "cookie-parser";

// import { validateTest } from "./middleware/validationMiddleware.js";

//routes
import jobRouter from "./routes/jobRouter.js";
import authRouter from './routes/authRouter.js';

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(cookieParse());
app.use(express.json());
app.use(morgan("dev"));

// app.post(
//     "/api/v1/test",
//     validateTest,
//     (req, res) => {
//         const { name } = req.body;
//         res.json({ message: `hello ${name}` });
//     }
// );

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(
        "mongodb+srv://vermarashmi559:rashmi@cluster0.37fzmq0.mongodb.net/JOBIFY-MERN?retryWrites=true&w=majority"
    );
    app.listen(port, () => {
        console.log("db is connected");
        console.log(`server running on port ${port}`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
