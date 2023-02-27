import express, { Application, Request, Response } from 'express'


const app: Application = express()
const port = 4000
const mongoose = require("mongoose")
app.use(express.json())

const cors = require('cors');
app.use(cors());

const dotenv = require("dotenv").config()


const mongoURL = process.env.MONGO_URI

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
    const { userId } = req.body
    users.create({
        userId
    }).then(() => {
        res.send({ "status": "OK" })
    }).catch((err: any) => {
        console.log(err)
    })
})

// app.get("/test", async (req: Request, res: Response) => {
//     users.find({ }, function (err: any, response: any) {
//         res.send(response)
//     })
// })

app.listen(port, () => {
    console.log("Connected successfully")
})

