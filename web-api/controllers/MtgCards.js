
const MtgCard = require('../models/MtgCard');

module.exports.getMtgCards = async (req, res, next) =>{
 
    //await MtgCard.find({ req.body.mtgcard })

}

module.exports.postMtgCard = async (req, res, next) =>{
    const NewMtgCard = new MtgCard(req.body);

    console.log (NewMtgCard, req.body.mtgcard, req.body)

    await NewMtgCard.save()

    res.send('success')

}