const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dailyGoalRoutes= require("./routes/dailyGoalsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoDB();

app.use("/api/auth", authRoutes);
app.use("/api/goals", dailyGoalRoutes);



app.get("/", (req, res) => {
    res.send("green wall running");
});

app.get("/api/test", (req,res)=>{
    res.json({
       message:"hello from api routes"
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});