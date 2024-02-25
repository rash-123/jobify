import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import mongoose from "mongoose";
import cookieParse from "cookie-parser";

// import { validateTest } from "./middleware/validationMiddleware.js";

import cloudinary from "cloudinary";

//routes
import jobRouter from "./routes/jobRouter.js";
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from "url";
import path from 'path';

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, './public')));

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

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});


app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
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
