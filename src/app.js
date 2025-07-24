import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();  // Must come first!
const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));


app.use(express.json ( {limit : "16kb"}))
// for url handling in express app
app.use(express.urlencoded({extended : true}))
//for storing files
app.use(express.static("public"))


app.use(cookieParser())




// routes

import userRouter from './routes/user.route.js'



//routes declaration
app.use("/api/v1/user", userRouter);

// https;//localhost:8000/api/v1/user/login

export {app}