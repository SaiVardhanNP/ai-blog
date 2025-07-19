import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";


const app=express();


await connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin",adminRouter);
app.use("/api/blog",blogRouter);

const port=process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.json({
        msg:"Hello Worlde!"
    })
})

app.listen(port,()=>{
    console.log(`listening on port ${port}!`)
})