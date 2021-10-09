const User = require('../models/User');
const bcrypt = require('bcrypt');
const { checkout } = require('../routes/Users');
const jwt = require('jsonwebtoken');

const env = process.env;

// registering a new user
module.exports.registerUser = async (req, res) => {
    // TODO: remove unneccessary try catch later if not needed
    var {email, username, password='', authorization_level=0} = req.body
    console.log(req.body)

    // Validate user input
    if (!(email && username && password)) {
        res.status(400).send("All input is required");
      }
  
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    const user = new User({email, username, password, authorization_level});
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
    
    // Create token
    const token = jwt.sign(
        { user_id: user._id, username },
        env.JWTSECRET,
        {
            expiresIn: "2h",
        }
    );
    // save user token
    user.token = token;
    
    await user.save()
        // return new user
    res.status(201).json(user);
}

// logging in
module.exports.login = async (req, res) => {
    var {username, password} = req.body
    console.log(req.body)

    const user = await User.findOne({ username: username });

    
    
    // Validate user input
    if (!(username && password)) {
        res.status(400).send("All input is required");
    }
    if (user) {
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = jwt.sign(
                {_id: user._id },
                env.JWTSECRET,
                {
                  expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;

            const cookie = req.cookies.token
            if (cookie == undefined){
                res.cookie('token', token, { httpOnly: true, secure: true });
                }

            res.status(200).json(user);
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};

module.exports.logout = async (req, res) => {

    
    // Set token to none and expire after 5 seconds


    res.clearCookie("token");

    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}