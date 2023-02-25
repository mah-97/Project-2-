const express = require('express')
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('index')
})

// Login Route
router.get('/login', (req,res) => {
    res.render('login.ejs')
})


// Register route
router.get('/register', (req, res) => {
    res.render('register', {user: new User()})
});

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        User.users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (e) {
        res.redirect('/register')
    }
})


module.exports = router