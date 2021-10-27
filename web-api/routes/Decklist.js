const express = require('express');
const router = express.Router({mergeParams:true});
const Decklist = require('../controllers/Decklist');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}

router.post('/createDecklist', catchAsync(Decklist.createDecklist)) // approve an order (Employees Authorization)

router.route('/:id')
.get(catchAsync (Decklist.getDecklist))
.put(catchAsync (Decklist.editDecklist))
.delete(catchAsync (Decklist.deleteDecklist))

module.exports = router;
