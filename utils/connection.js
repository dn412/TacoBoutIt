///////////////////////
//// depdendecies  ////
///////////////////////

require('dotenv').config()
const mongoose = require('mongoose')

////////////////////////
//// DB connection  ////
////////////////////////
const DATABASE_URL = process.env.DATABASE_URL

// DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish our connection to the db
mongoose.connect(DATABASE_URL, CONFIG)

// we tell mongoose what to do upon certain events
mongoose.connection
    .on('open', () => console.log('mongoose connected'))
    .on('close', () => console.log('mongoose disconnected'))
    .on('error', (err) => console.log('mongoose error\n', err))

////////////////////////////
//// export connection  ////
////////////////////////////
module.exports = mongoose
