import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port = 4000
const mongoose = require("mongoose")
app.use(express.json())

const cors = require('cors');
app.use(cors());

const mongoURL = "mongodb+srv://ryangao:ZLWJf7vs5PH6WnyW@cluster0.hj4bjtj.mongodb.net/?retryWrites=true&w=majority"

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

app.post("/register", async (req: Request, res: Response) => {
    const { userId } = req.body
    try {
        await users.create({
            userId
        })
        res.send({ "status": "OK" })
    } catch (error) {
        console.log(error)
    }
})

// app.get("/test", async (req: Request, res: Response) => {
//     users.find({ }, function (err: any, response: any) {
//         res.send(response)
//     })
// })

app.listen(port, () => {
    console.log("Connected successfully")
})

