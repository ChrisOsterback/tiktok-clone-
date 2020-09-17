// import
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'


import Videos from './dbModel.js'


import * as api_mongo from './config.json';
const token = api_mongo.token;
// app config
const app = express();
const port = process.env.PORT || 9000


// middleware
app.use(express.json())
app.use(Cors())


// db config
const connection_url = `${token}`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

};

mongoose.connect(connection_url, options)




// api routes
app.get("/", (req, res) => res.status(200).send("hello world"))

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})




app.post("/v2/posts", (req, res) => {
    const dbVideos = req.body


    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new video created: \n ${data}`)
        }
    })

})


// listen
app.listen(port, () => console.log(`Listening on port: ${port}`))