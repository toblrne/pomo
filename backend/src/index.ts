import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port = 4000
const mongoose = require("mongoose")
app.use(express.json())

const cors = require('cors');
app.use(cors());

const dotenv = require("dotenv").config()

const mongoURL = process.env.MONGO_URI

mongoose.set('strictQuery', true)

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Connected to database")
    })
    .catch((e: any) => console.log(e))

require("./schema")

const users = mongoose.model("userInfo")

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.post("/register", (req: Request, res: Response) => {
    const { userId, settings } = req.body
    users.create({
        userId,
        settings
    }).then(() => {
        res.send({ "status": "OK" })
    }).catch((err: any) => {
        console.log(err)
    })
})

app.post("/userData", (req: Request, res: Response) => {
    const { type, user } = req.body
    users.findOne({ "userId": user }, type, (err: any, response: any) => {
        res.send(response)
    })
})

app.post("/updateSettings", (req: Request, res: Response) => {
    const { user, timer, time } = req.body

    let updateObject

    if (timer == "pomodoro") {
        updateObject = { "settings.pomodoro": time }
    }

    if (timer == "shortBreak") {
        updateObject = { "settings.shortBreak": time }
    }

    if (timer == "longBreak") {
        updateObject = { "settings.longBreak": time }
    }

    users.findOneAndUpdate({ "userId": user }, updateObject, (err: any, response: any) => {
        res.send(response)
    })
})

// app.post("/changeSettings", (req: Request, res: Response) => {
//     const { type, user } = req.body
//     users.findOne({ "userId": user }, type, (err: any, response: any) => {
//         res.send(response)
//     })
// })

// app.get("/test", async (req: Request, res: Response) => {
//     users.find({ }, function (err: any, response: any) {
//         res.send(response)
//     })
// })

app.listen(port, () => {
    console.log("Connected successfully")
})

