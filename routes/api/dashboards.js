const express = require('express');
const router = express.Router();

// Dashboard model
const Dashboard = require('../../models/Dashboard');

// @route   GET api/dashboards
// @desc    Get all dashboard
// @access  Public
router.get('/', (req, res) => {
    Dashboard
        .find()
        .then(dashboards => res.json(dashboards));
});

// @route   POST api/dashboards
// @desc    Create a dashboard
// @access  Public
router.post('/', (req, res) => {
    const newDashboard = new Dashboard({
        company: req.body.company,
        name: req.body.name,
        content: req.body.content
    });
    
    newDashboard.save().then(dashboard => res.json(dashboard));
});

// @route   DELETE api/dashboards/:id
// @desc    Remove a dashboard
// @access  Public
router.delete('/:id', (req, res) => {
    Dashboard.findById(req.params.id)
        .then(dashboard => dashboard.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

// TODO: update function here!

module.exports = router;