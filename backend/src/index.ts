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
const logs = mongoose.model("logs")

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

    users.findOneAndUpdate({ "userId": user }, updateObject, { upsert: true }, (err: any, response: any) => {
        res.send(response)
    })
})

app.post("/updateLogs", (req: Request, res: Response) => {
    const { user, cycleStart, cycleEnd } = req.body
    logs.create({ userId: user, startDate: cycleStart, endDate: cycleEnd })
})


app.post("/displayData", (req: Request, res: Response) => {
    const { user, type } = req.body;

    let n: number;
    if (type == "week") { n = 7 }
    if (type == "total") { n = 365 }

    logs.find({ userId: user }, { _id: 0, startDate: 1, endDate: 1 }, (err: any, response: any) => {
        // Create an object to store the results
        const results: any = {};

        // Get the current date/time
        const now = new Date();

        // Loop through each item in the input array
        response.forEach((item: { startDate: string | number | Date; endDate: string | number | Date }) => {
            // Parse the start and end dates
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);

            // If the start date is more than n days in the past, skip this item
            if (now.getTime() - startDate.getTime() > n * 24 * 60 * 60 * 1000) {
                return;
            }

            // If the start and end dates are on different days, adjust the interval
            if (startDate.getDate() !== endDate.getDate()) {
                // Calculate the time from the start date to midnight
                const midnight = new Date(startDate);
                midnight.setHours(24, 0, 0, 0);
                const startInterval = (midnight.getTime() - startDate.getTime()) / 1000;
                console.log(startInterval)

                // Calculate the time from midnight to the end date
                const endInterval = (endDate.getTime() - midnight.getTime()) / 1000;
                console.log(endInterval)

                // Update the result object for both start and end dates
                results[`${startDate.getMonth() + 1}-${startDate.getDate()}`] = (results[`${startDate.getMonth() + 1}-${startDate.getDate()}`] || 0) + startInterval;
                results[`${endDate.getMonth() + 1}-${endDate.getDate()}`] = (results[`${endDate.getMonth() + 1}-${endDate.getDate()}`] || 0) + endInterval;

                startDate.setDate(startDate.getDate() + 1);
            } else {

            // Loop through each day between the start and end dates
            const start = new Date(Math.max(startDate.getTime(), now.getTime() - n * 24 * 60 * 60 * 1000));
            const end = new Date(Math.min(endDate.getTime(), now.getTime()));
            let currentDate = new Date(start);
            while (currentDate <= end) {
                let interval = (endDate.getTime() - startDate.getTime()) / 1000;
                // Format the date as "month-day"
                const key = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

                // Add the time interval to the result object
                if (!results[key]) {
                    results[key] = 0;
                }
                results[key] += interval;

                // Move to the next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }});

        // Convert the result object to an array of objects
        const output = [];
        let currentDate = new Date(now);
        for (let i = 0; i < n; i++) {
            // Format the date as "month-day"
            const key = `${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

            // Add an object to the output array
            output.push({
                date: key,
                time: results[key] || 0
            });

            // console.log(results["3-4"])

            // Move to the previous day

            currentDate.setDate(currentDate.getDate() - 1);

        }
        // Reverse the output array so that it is in chronological order
        res.send(output.reverse());
    });
});





app.post("/testLog", (req: Request, res: Response) => {
    logs.create({ startDate: "test", endDate: "test", userId: "test2" }).then(() => {
        res.send({ "status": "OK" })
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

