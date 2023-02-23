const express = require('express')
const router = express.Router()

// All Posts Route
router.get('/', (req, res) => {
    res.render('friends/index')
})

// New Post Route
router.get('/new', (req, res) => {
    res.render('friends/new')
})

// Create Post Route
router.post('/', (req, res) => {
    res.send('Create')
})



module.exports = router