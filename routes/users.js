const express = require('express');
const router = express.Router();
const User = require('../models/user');

// All Users Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', {
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
});

// New User Route
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
});

// Create User Route
router.post('/', async (req, res) => {
    const user = new User ({
        name: req.body.name,
        country: req.body.country,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser = await user.save()
        res.redirect(`users/${newUser.id}`)
    } catch {
        res.status(400).render('users/new', {
            user: user,
            errorMessage: 'Error creating new User'
        });
    }
});

// Show User Route
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
    // const post = await postMessage.find({ user: user.id}).limit(10).exec()
    res.render('users/show', 
        {user: user})
    } catch {
        res.redirect('/')
    }
})

// Edit User Route
router.get('/:id/edit',  async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
    res.render('users/edit', {user: user})
    } catch {
        res.redirect('/users')
    }
})

//Update User Route
router.put('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        user.name = req.body.name
        user.country = req.body.country
        user.age = req.body.age
        user.email = req.body.email
        user.password = req.body.password
        await user.save()
        res.redirect(`/users/${user.id}`)
    } catch {
        if (user == null) {
            res.redirect('/')
        } else {
            res.status(400).render('users/edit', {
                user: user,
                errorMessage: 'Error updating new User'
            });
        }
    }
})
// Delete User Route
router.delete('/:id', async (req, res) => {
    let user
    try {
        user = await User.findById(req.params.id)
        await user.remove()
        res.redirect('/users')
    } catch {
        if (user == null) {
            res.redirect('/')
        } else {
            res.redirect(`/users/${user.id}`)
        }
    }
})

module.exports = router
