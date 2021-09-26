const User = require('../models/Users');

// registering a new user
module.exports.registerUser = async (req, res, next) =>{
    // TODO: remove unneccessary try catch later if not needed
    const {email, username, password, authorization_level=0} = req.body
    console.log(req.body)
    // const NewUser = new User({email:email, username:username, password:password, authorization_level:'0'});
    const newUser = new User({email, username, password, authorization_level});
    await newUser.save()

    res.send('success')
}

// TODO: logging in
module.exports.login = (req, res, next) =>{
    res.send('success')
}