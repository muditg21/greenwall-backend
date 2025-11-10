const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Goal", goalSchema);
