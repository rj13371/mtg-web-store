const express = require('express');
const router = express.Router({mergeParams:true});
const MtgCards = require('../controllers/MtgCards')

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
   }
router.get('/', MtgCards.getMtgCards)
router.post('/', catchAsync (MtgCards.postMtgCard))

module.exports = router;