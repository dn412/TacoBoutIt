//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Post = require('../models/post')


// const axios = require('axios')

const router = express.Router()

//////////////////////////////
//// Routes + Controllers ////
//////////////////////////////
// Index
router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            console.log('found these posts', posts)

            res.render('posts/index', { posts })
        })
        .catch(error => console.error)
})
// new
router.get('/new', (req, res) => {
    res.send('the new post') 
})

// Create

// edit
router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            console.log('found this post', post)

            res.send(`Edit page for ${post.title}`)
        })
        .catch(error => console.error)
})


// Update


// Delete

// Show
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            console.log('found this post', post)
            res.json(posts)
        })
        .catch(error => console.error)
})


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router