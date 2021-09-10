
const MtgCard = require('../models/MtgCard');


//added regex for search,
// need to refactor this to change search dynamically based on color, manacost, set etc
module.exports.getMtgCards = async (req, res, next) =>{

    const foundCard = await MtgCard.find({name: new RegExp('.*'+req.query.name+'.*', "i")})
    console.log (req.query, foundCard)
    
      res.send(foundCard)

}

module.exports.postMtgCard = async (req, res, next) =>{
    const NewMtgCard = new MtgCard(req.body);

    await NewMtgCard.save()

    res.send('success')

}