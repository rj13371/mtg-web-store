const express = require('express');
const router = express.Router({mergeParams:true});
const Users = require('../controllers/Users');
// const { verifyToken } = require('../middleware/bak_20211009_auth');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}



router.post('/register', catchAsync(Users.registerUser)) //register a new user

router.post('/login', catchAsync(Users.login))


router.get('/logout', catchAsync(Users.logout)) //logging out



router.post('/reset/requestResetPassword/', catchAsync(Users.requestResetPassword))

router.post('/reset/resetPassword/', catchAsync(Users.resetPassword))

router.get('/verify/:uniqueString', catchAsync(Users.verify))



// router.get('/verify/passwordResetPage/:token/:id', catchAsync(Users.resetPassword))

// router.post('/verify/resetPassword/:uniqueString', catchAsync(Users.resetPassword))



module.exports = router;
