const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DashboardSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = Dashboard = mongoose.model('dashboard', DashboardSchema);