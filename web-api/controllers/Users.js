const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { checkout } = require('../routes/Users');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const sendEmail = require('../utils/Nodemailer')
const Token = require('../models/Token')

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

    const oldEmail = await User.findOne({ email });

    if (oldEmail) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    //generates unique string for email verify
    const uniqueString = crypto.randomBytes(20).toString('hex');
    const isValid = false;

    const user = new User({email, username, password, authorization_level, uniqueString, isValid});
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // now we set user password to hashed password
        user.password = await bcrypt.hash(user.password, salt);
    
    // Create token
    const token = jwt.sign(
        { user_id: user._id, username },
        env.JWTSECRET,
    );
    // save user token
    user.token = token;


    const subject = `Thank you ${username} for registering at Bastion Games`

    await sendEmail('createUser', email, subject, null, uniqueString)
    
    await user.save()
        // return new user
    res.status(201).json(user);
}

// logging in
module.exports.login = async (req, res) => {
    res.clearCookie("token");
    var {username, password} = req.body
    console.log(req.body)

    const user = await User.findOne({ username: username });

    if (user.isValid == false){
        res.status(400).send("Please verify first before login");
    }
    
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
                res.cookie('token', token, {  secure: true, sameSite: 'none' });
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

    // const cookie = req.cookies.token

    // res.clearCookie(cookie, {  secure: true, sameSite: 'none' });

    res.clearCookie("token");

    res
        .status(200)
        .json({ success: true, message: 'User logged out successfully' })
}

module.exports.verify = async (req, res) => {

    const {uniqueString} = req.params

    const user = await User.findOne({uniqueString: uniqueString})

    console.log(req.params, user)

    if (user){
        user.isValid = true;
        await user.save()
        res.send('success')
    }else {
        res.json('user not fonud')
    }


}


module.exports.requestResetPassword = async (req,res) => {

    const email = req.body.email 

    const user = await User.findOne({ email });
  
    if (!user) throw new Error("User does not exist");
    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(resetToken, salt);
  
    await new Token({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `https://mtg-card-store.herokuapp.com/reset/passwordResetPage/${resetToken}/${user._id}`;
    sendEmail('resetPassword',user.email,"Password Reset Request",link,null);
    res.status(200).json(link);
  };



module.exports.resetPassword = async (req,res) => {

    const {userId, token, password} = req.body

    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });


    sendEmail(
        'resetPasswordConfirmation',
      user.email,
      "Password Reset Successfully",
        user.username,
    );
    await passwordResetToken.deleteOne();
    return true;
  };