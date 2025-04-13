// aftabjamil0786
// YZf8IrSi0ZXQInWc
import express from "express"
import dotenv from "dotenv"
import connectDB from './mongoDB/db.js'
import userRoutes from "./routers/user.route.js"
import cors from 'cors'
import cookieParser from 'cookie-parser' 
import courseRouter from './routers/course.route.js'
import mediaRouter from './routers/media.route.js'
import paymentRouter from './routers/payment.route.js'
import courseProgressRouter from "./routers/courseProgress.route.js"
import oAuthRouter from "./routers/OAuth.router.js";
import passport from "passport"
import "./GoogleAuth/passport.js"


dotenv.config({});
connectDB();
const app=express()
// default middle-ware
app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "https://lms-frontend-tdti.onrender.com",
    credentials: true
}))
app.use(passport.initialize());
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/media",mediaRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/course-progress",courseProgressRouter)
app.use("/auth",oAuthRouter)
const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Listen at port ${port}`)
})