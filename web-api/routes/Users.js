const express = require('express');
const router = express.Router({mergeParams:true});
const Users = require('../controllers/Users')

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}
router.post('/register', catchAsync(Users.registerUser)) //register a new user

router.post('/login', catchAsync(Users.login))

router.get('/logout', catchAsync(Users.logout))
// TODO: add remaining methods (get, put, edit)
// router.route('/:id')
// .get(catchAsync (MtgCards.getMtgCard))
// .put(catchAsync (MtgCards.editMtgCard))

module.exports = router;

