//User of the blog
//Bio of blog
//Schema might have fields: username, password, email, date_joined, etc.


////////////////////////////////////////////////////
//// Our schema and model for the user resource ////
////////////////////////////////////////////////////
// we want our mongoose object to relate to our db
// we're going to bring in the mongoose connection from our utils
const mongoose = require('../utils/connection')

// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// user schema
const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String
}, { 
    timestamps: true 
})

const User = model('User', userSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = User