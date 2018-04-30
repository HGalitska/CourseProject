const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

// ---------------------------------------------------- Creating express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ---------------------------------------------------- Configuring the database
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
    console.log("✅ Successfully connected to the database.");
}).catch(err => {
    console.log("❌ Could not connect to the database. Exiting now...");
    process.exit();
});

// ---------------------------------------------------- Creating routes
app.get('/', (req, res) => {
    res.json({"message": "Welcome to my application."});
});

// ---------------------------------------------------- API Routes
require('./app/routes/user.routes.js')(app);

// ---------------------------------------------------- Starting server
app.listen(3000, () => {
    console.log(" ✨ Magic happens on port 3000! ✨ ");
});
