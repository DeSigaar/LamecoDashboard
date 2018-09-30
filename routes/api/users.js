const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public -- Should be private
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Create an user
// @access  Public -- Should be private
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    newUser.save().then(user => res.json(user));
});

// @route   DELETE api/users/:id
// @desc    Remove an user
// @access  Public -- Should be private
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;