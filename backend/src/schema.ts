const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        userId: String,
        settings: {
            pomodoro: Number,
            shortBreak: Number,
            longBreak: Number
        }
    },
    {
        collection: "userInfo"
    }
)

mongoose.model("userInfo", schema)