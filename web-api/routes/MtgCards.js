const express = require('express');
const router = express.Router({mergeParams:true});
const MtgCards = require('../controllers/MtgCards')

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
   }
router.get('/card', catchAsync(MtgCards.getMtgCards)) //SEARCH
router.post('/addcard', catchAsync (MtgCards.postMtgCard)) //ADD CARD

module.exports = router;