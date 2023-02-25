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
// router.post('/', async (req, res) => {
//     const user = new User ({
//         name: req.body.name,
//         country: req.body.country,
//         age: req.body.age,
//         email: req.body.email,
//         password: req.body.password
//     });
//     try {
//         const newUser = await user.save()
//         res.redirect(`users/${newUser.id}`)
//     } catch {
//         res.status(400).render('users/new', {
//             user: user,
//             errorMessage: 'Error creating new User'
//         });
//     }
// });

// POST /User
router.post('/', (req, res) => {
    // Get the user User data from the request body
    const userData = req.body;
    
    // Create a new User using the profile model
    const newUser = new User(userData);
  
    // Save the new User to the database
    newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error saving profile');
      }
      // Return the saved User as JSON
      res.redirect('/');
    });
  });
  

// Show User Route
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//     // const post = await postMessage.find({ user: user.id}).limit(10).exec()
//     res.render('users/show', 
//         {user: user})
//     } catch {
//         res.redirect('/')
//     }
// })

// GET /profiles/:id
router.get('/:id', (req, res) => {
    // Get the ID of the profile to retrieve from the request parameters
    const userId = req.params.id;
    
    // Use the profile model to find the profile by ID
    const user = User.findById(userId, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error retrieving profile');
      }
      // Render the sers page
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

//Update User Route
// router.put('/:id', async (req, res) => {
//     let user
//     try {
//         user = await User.findById(req.params.id)
//         user.name = req.body.name
//         user.country = req.body.country
//         user.age = req.body.age
//         user.email = req.body.email
//         user.password = req.body.password
//         await user.save()
//         res.redirect(`/users/${user.id}`)
//     } catch {
//         if (user == null) {
//             res.redirect('/')
//         } else {
//             res.status(400).render('users/edit', {
//                 user: user,
//                 errorMessage: 'Error updating new User'
//             });
//         }
//     }
// })

// PUT /user/:id
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
