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
router.post('/', (req, res) => {
    const userData = req.body;
    const newUser = new User(userData);
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error saving profile');
      }
      res.redirect('/');
    });
  });
  
// Show User Route
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = User.findById(userId, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error retrieving profile');
      }
      res.render('users/show', {user: user});
    });
  });
  

// Edit User Route
router.get('/:id/edit',  async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
    res.render('users/edit', {user: user})
    } catch {
        res.redirect('/users')
    }
})

// Update User Route
router.put('/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body, { new: true }, (err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error updating profile');
      }
      res.redirect('/users');
    });
  });
  
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
