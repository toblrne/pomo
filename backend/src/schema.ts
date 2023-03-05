const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userId: { type: String },
        settings: {
            pomodoro: { type: Number },
            shortBreak: { type: Number },
            longBreak: { type: Number }
        }
    },
    {
        collection: "userInfo"
    }
)

mongoose.model("userInfo", userSchema)

const logSchema = new mongoose.Schema(
    {
        startDate: { type: String },
        endDate: { type: String },
        userId: { type: String, index: true }
    },
    {
        collection: "logs"
    }
)

mongoose.model("logs", logSchema)



// on start : set a start time in database
// on Time End : set an end time in database
// on reset : also set an end time in database