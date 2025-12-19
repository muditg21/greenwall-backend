const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

const dailyGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    tasks: [taskSchema],
},
    {
        timestamps: true,
    }
);


dailyGoalSchema.index({user:1,date:1},{unique:true});

module.exports=mongoose.model("dailyGoal",dailyGoalSchema);