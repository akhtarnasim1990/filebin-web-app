const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
require('./db/mongoose')
const fileRouter = require('./routers/file')

global.__basedir = __dirname;

const app = express();

const port = process.env.PORT || 5000;

app.use(cors())

app.use(express.urlencoded({extended: true}))

app.use(express.json({limit: '20mb'}))

app.use(fileRouter)

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});
