const express = require('express');
const router = express.Router({mergeParams:true});
const Event = require('../controllers/Event');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}

router.get('/getAllEvents', catchAsync(Event.getAllEvents)) 
router.post('/createEvent', catchAsync(Event.createEvent)) 


module.exports = router;
