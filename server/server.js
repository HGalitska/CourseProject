const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, 'doc-' + Date.now() + file.originalname)
    }
});
const upload = multer({storage: storage});

const User = require('./app/models/user.model.js');

// ---------------------------------------------------- Creating express app
const app = express();

app.set('json spaces', 40);

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
// ---------------------------------------------------- Configuring the database
const db = require('./config/database.config.js');

mongoose.Promise = global.Promise;

mongoose.connect(db.url)
    .then(() => {
    }).catch(err => {
    console.log("❌ Could not connect to the database. Exiting now...");
    process.exit();
});

// ---------------------------------------------------- Configuring secret
const secret = require('./config/secret.config.js').secret;
app.set('superSecret', secret);

// ---------------------------------------------------- Basic Routes
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to my application."
    });
});

app.post('/authenticate', (req, res) => {
    User.findOne({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            if (!user.passwordIsValid(req.body.password)) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                const payload = {
                    user_id: user._id
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: '1d'
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

// middleware to check jason web token
const checkJWT = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

// ---------------------------------------------------- API Routes

require('./app/routes/document.routes.js')(app, upload);
require('./app/routes/user.routes.js')(app, checkJWT);

app.use(checkJWT);
require('./app/routes/course.routes.js')(app);
require('./app/routes/group.routes.js')(app);
require('./app/routes/lecture.routes.js')(app);
require('./app/routes/task.routes.js')(app);
require('./app/routes/submittedTask.routes.js')(app);

// ---------------------------------------------------- Starting server
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(" ✨ Magic happens on port 3000! ✨ ");
});
