const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/post');
const uploadPath = path.join('public', 'images', 'postPhotos')
const User = require('../models/user');
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// // All Post Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const posts = await Post.find(searchOptions)
        res.render('posts/index', {
            posts: posts,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
});

// New Post Route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Post())
});

// Create Post Route
router.post('/', upload.single('postphoto'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const post = new Post({
        location: req.body.location,
        postPhoto: fileName,
        description: req.body.description,
        tags: req.body.tags
    })
    
    try {
        const newPost = await post.save()
        res.redirect('posts')
    } catch {
        renderNewPage(res, post, true)
    }
});

async function renderNewPage(res, post, hasError = false) {
    try {
        const users = await User.find({})
        const params = {
            users: users,
            post: post
        }
        if (hasError) params.errorMessage = 'Error Creating Post'
        res.render('posts/new', params)
    } catch {
        res.redirect('/posts')
    }
}

// Show Post Route
router.get('/:id', async (req, res) => {
   
})

// Edit Post Route
router.get('/:id/edit', async (req, res) => {

})

// Update Post Route
router.put('/:id', async (req, res) => {

})

// Delete Post Route
router.delete('/:id', async (req, res) => {
 
})

module.exports = router
