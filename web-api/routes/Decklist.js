const express = require('express');
const router = express.Router({mergeParams:true});
const Decklist = require('../controllers/Decklist');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}

router.post('/createDecklist', catchAsync(Decklist.createDecklist)) // approve an order (Employees Authorization)
router.get('/:id', catchAsync(Decklist.getDecklist)) 

module.exports = router;
