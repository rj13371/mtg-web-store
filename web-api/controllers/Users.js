const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { checkout } = require('../routes/Users');
const jwt = require('jsonwebtoken');

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
        process.env.TOKEN_KEY,
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
                { user_id: user._id, username },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
            );
            return res.cookie("access_token", token, {
                httpOnly: true,
                // TODO: Create HTTPS for production version of the website
                secure: process.env.NODE_ENV === "production",
            }).status(200).json({ message: "Logged in successfully" });
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
};

//logging out
// TODO: WIP, does apparently not do the thing yet
module.exports.logout = async(req, res) => {
    return　res.clearCookie("access_token").status(200).json({ message: "Successfully logged out"});
}