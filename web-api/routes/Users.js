const express = require('express');
const router = express.Router({mergeParams:true});
const Users = require('../controllers/Users');
const { verifyToken } = require('../middleware/auth');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}
router.post('/register', catchAsync(Users.registerUser)) //register a new user

// Fabian, 10/04 apparently login is a get request
router.get('/login', catchAsync(Users.login))//logging in
// TODO: add remaining methods (get, put, edit)
// router.route('/:id')
// .get(catchAsync (MtgCards.getMtgCard))
// .put(catchAsync (MtgCards.editMtgCard))

router.get('/logout', catchAsync(Users.logout)) //logging out

module.exports = router;
