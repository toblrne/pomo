const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        userId: String,
    },
    {
        collection: "userInfo"
    }
)

mongoose.model("userInfo", schema)