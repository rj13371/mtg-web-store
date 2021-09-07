
const MtgCard = require('../models/MtgCard');

module.exports.getMtgCards = async (req, res, next) =>{
 
    res.send('mtg cards!')

}

module.exports.postMtgCard = async (req, res, next) =>{
    const NewMtgCard = new MtgCard(req.body.mtgcard);

    console.log (NewMtgCard, req.body.mtgcard)

    await NewMtgCard.save()

}