const express = require('express');
const router = express.Router({mergeParams:true});
const MtgCards = require('../controllers/MtgCards')

router.get('/', MtgCards.getMtgCards)

module.exports = router;