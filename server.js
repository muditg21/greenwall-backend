const express =require("express");
const cors=require("cors");
require("dotenv").config();
const mongoDB=require("./config/db");

const app=express();

app.use(cors());
app.use(express.json());

mongoDB();

app.get("/",(req,res)=>{
    res.send("green wall running");
});

const port=process.env.port || 5000;
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
});