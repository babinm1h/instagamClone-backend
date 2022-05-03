import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import { router } from "./routers/index.js";
import { passport } from "./middleware/passport.js"


const app = express()
const PORT = process.env.PORT || 7777
const origins = ["http://localhost:3000"]


app.use(express.json())
app.use(cookieParser())
passport.initialize()
app.use(cors({
    origin: origins,
    credentials: true
}))
app.use("/api", router)



const start = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(PORT + " started"))
}
start()