const jwt = require('jsonwebtoken')
const User = require('../models/Users');
const env = process.env;

module.exports.checkToken = async (req, res, next) => {

    console.log(req.cookies.token);
    const req_token = req.cookies.token 


    let auth = false;
    let isExpiredToken = false;
    let dateNow = new Date();


    if(!req_token){
        return res.status(200).json({message: 'please login'})
    }

    try{

        const token = jwt.decode(req_token, env.JWTSECRET);
        console.log('here!!!!', token.exp, (dateNow/1000))

        if (token.exp < (dateNow/1000)){

            res.clearCookie("token");


        }

        if(!jwt.verify(req_token, env.JWTSECRET)) throw 'invalid token'
        else{
            auth=true;
        }
    }catch(err){
        
        console.log(err,'invalid token')
    }

    if (!auth){
        return res.status(400).json({message:'token verification failed'})
    }
    else {
        const data = jwt.verify(req_token, env.JWTSECRET)


        

        const user = await User.findById(data._id)

        if (!user){
            return res.status(400).json({error:'user not found'})
        }

        const {_id, email, username, authorization_level} = user

        console.log(_id, email, username, authorization_level)

        return res.status(200).json({user: {_id, email, username, authorization_level}})
    }


}