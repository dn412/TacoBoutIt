//////////////////////////////
//// Import Dependencies  ////
//////////////////////////////
const express = require('express')
require('dotenv').config()

const Post = require('../models/post')
const checkLogin = require('../utils/ensureLoggedIn')

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

            res.render('posts/index', { posts, title: 'All Posts' })
        })
        .catch(error => console.error)
})
// new
router.get('/new', checkLogin, (req, res) => {
    res.render('posts/new', { title: 'Add a new Post'})
})

// Create
router.post('/', checkLogin, (req, res) => {
    // need to assign owner
    req.body.owner = req.user._id
    // handle our checkbox
    req.body.readyToPost = req.body.readyToPost === 'on' ? true : false

    console.log(req.body)
    Post.create(req.body)
        .then(post => {
            res.redirect(`/posts/${post._id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/posts/new')
        })
})


// edit
router.get('/edit/:id', checkLogin, (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            console.log('found this post', post)

            res.send(`Edit page for ${post.title}`)
        })
        .catch(error => console.error)
})


// Update


// Delete
router.delete('/:id', checkLogin, (req, res) => {
    // we want to find the post
    Post.findById(req.params.id)
        // then we want to delete the post
        .then(post => {
            if (req.user && post.owner == req.user.id) {
                return post.deleteOne()
            } else {
                res.send('something went wrong')
            }
        })
        // then redirect the user
        .then(data => {
            console.log('returned from deleteOne', data)
            res.redirect('/posts')
        })
        // catch any errors
        .catch(error => console.error)
})

// Show
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            console.log('found this post', post)
            res.render("posts/show", { post, title:`${post.title}`})
        })
        .catch(error => console.error)
})


////////////////////////////
//// Export the Router  ////
////////////////////////////
module.exports = router