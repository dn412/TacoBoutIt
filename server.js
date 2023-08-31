//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

// we'll build a middleware function to user in this file

// our routers/controllers will be imported here
const AuthRouter = require('./controllers/authControllers')
const PostRouter = require('./controllers/postControllers')

const app = express()

// set up our view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/////////////////////
//// Middleware  ////
/////////////////////
middleware(app)

////////////////
//// Routes ////
////////////////
app.get('/', (req, res) => {
    res.redirect('/post')
})

app.use('/', AuthRouter)
app.use('/posts', PostRouter)

//////////////////////////
//// Server Listener  ////
//////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('taco blog is ready to go')
})