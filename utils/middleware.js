// instead of filling server.js with middleware
//  we can process all of it here, and just call this like a function in server.
// thie function takes the app as an argument and runs middleware on as part of the request/response cycle

//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
require('./passport')

const middleware = (app) => {
    console.log('Middleware function ran')
    app.use(methodOverride('_method'))
    app.use(morgan('tiny'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(express.json())
    // we can also set up our session for auth
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) => {
        res.locals.user = req.user
        next()
    })
}

///////////////////////////
//// Module to Export  ////
///////////////////////////
module.exports = middleware