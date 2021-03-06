const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const user = require("./routes/api/user");
const company = require("./routes/api/company");
const dashboard = require("./routes/api/dashboard");
const forgot = require("./routes/api/forgot");

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Database config
const db = require("./config/keys").mongoURI;

// Connect to mongo database
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use API routes
app.use("/api/user", user);
app.use("/api/forgot", forgot);
app.use("/api/company", company);
app.use("/api/dashboard", dashboard);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Set port to 5000 or the port running on the remote server
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
