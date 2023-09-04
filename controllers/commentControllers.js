//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

const router = express.Router()

//////////////////////////////
//// Routes + Controllers ////
//////////////////////////////

// Create
router.post('/:postId', checkLogin, (req, res) => {
    // need to assign author
    req.body.author = req.user._id

    // find the post
    Post.findById(req.params.postId)
        // push the comment into the comments array
        // save the postt
        .then(post => {
            post.comments.push(req.body)

            return post.save()
        })
        // redirect
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        // handle errors
        .catch(error => console.error)
})

// edit
router.get('/edit/:id', checkLogin, (req, res) => {
    res.send('commend edit form')
})

// Update
router.patch('/:id', checkLogin, (req, res) => {
    res.send('edit comment route')
})

// Delete
router.delete('/:postId/:commentId', checkLogin, (req, res) => {
    const fId = req.params.postId
    const cId = req.params.commentId
    // find the post
    Post.findById(fId)
        .then(post => {
            // isolate the comment
            const theComment = post.comments.id(cId)
            // check for ownership of author
            if (req.user && theComment.author == req.user.id) {
                // run a document method to remove the comment(could also use .remove())
                theComment.deleteOne()
                // save the parent model
                return post.save()
            } else {
                res.send('something went wrong')
            }
        })
        .then(post => {
            // redirect to the show page
            res.redirect(`/posts/${post._id}`)
        })
        .catch(error => console.error)
})


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router