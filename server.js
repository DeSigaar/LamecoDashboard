const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users.js');
const dashboards = require('./routes/api/dashboards.js');

const app = express();

// Bodyparse middleware
app.use(bodyParser.json());

// Database config
const db = require('./config/keys').mongoURI;

// Connect to mongo database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

// Use routes
app.use('/api/users', users);
app.use('/api/dashboards', dashboards);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));