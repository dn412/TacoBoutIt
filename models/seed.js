//////////////////////////////////////
//// Import Dependencies & Model  ////
//////////////////////////////////////
const mongoose = require('../utils/connection')
const Post = require('./post')

///////////////////////////
//// Seed Script code  ////
///////////////////////////

// first we grab our db variable
const db = mongoose.connection

// bc this is a script, we open then eventually close our one time connection to the db
db.on('open', () => {
    // array of starter resources(posts)
    const startPosts = [
        {
            title: "Gainesville,FL",
            content: "There's this taco joint that is awesome...",
            // Add other fields as necessary
        },
        {
            title: "New Zealand",
            content: "You need to try this amazing taco spot in New Zealand...",
        },
        // ... any other seed posts
    ];

    // when we seed the database, we remove everything from this collection
    Post.deleteMany({ author: null })
        .then(() => {
            // then add our startPosts to the collection
            // then close our connection to the db
            Post.create(startPosts)
                .then(data => {
                    console.log('these are the posts: \n', data)
                    db.close()
                })
                .catch(err => {
                    console.log('something went wrong \n', err)
                    db.close()
                })
        })
        // as always, handle errors
        .catch(err => {
            console.log('something went wrong \n', err)
            db.close()
        })
})