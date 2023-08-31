//Blog posts
//Title, Content, Comments
//Schema might have fields: title, content, author (reference to User), date_posted.


//////////////////////////////////////////////////////////////
//// Our schema and model for the post resource          ////
//////////////////////////////////////////////////////////////

// we're going to bring in the mongoose connection from our utils
const mongoose = require('../utils/connection')
// import our commentSchema, to use as a subdocument
const commentSchema = require('./comment')

// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// posts schema
const postSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
}, { timestamps: true })

// make the post model
// the model method takes two arguments
// the first is what we call our model
// the second is the schema used to build the model
const Post = model('Post', postSchema)

//////////////////////////
//// Export our Model ////
//////////////////////////
module.exports = Post