const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { checkout } = require('../routes/Users');
var session = require('express-session')

// registering a new user
module.exports.registerUser = async (req, res, next) => {
    // TODO: remove unneccessary try catch later if not needed
    var {email, username, password='', authorization_level=0} = req.body
    console.log(req.body)

    const user = new User({email, username, password, authorization_level});
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.status(201).send('success');
}

// logging in
module.exports.login = async (req, res, next) => {
    var {username, password} = req.body
    console.log(req.body)

    const user = await User.findOne({ username: username });
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
        res.status(200).json({ message: "Valid password" });
        var app = express()
            app.set('trust proxy', 1) // trust first proxy
            app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            //TODO:Use https
            cookie: { secure: false }
            }))
        } else {
        res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};

// git check