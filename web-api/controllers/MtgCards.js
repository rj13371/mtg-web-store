
const MtgCard = require('../models/MtgCard');


//added regex for search
module.exports.getMtgCards = async (req, res, next) =>{

    // const search = new RegExp('.*' + req.query.name + '.*', 'i')
    // console.log (req.query)
    
    const foundCard = await MtgCard.find({name: new RegExp('.*'+req.query.name+'.*', "i")})
    
      res.send(foundCard)

}

module.exports.postMtgCard = async (req, res, next) =>{
    const NewMtgCard = new MtgCard(req.body);

    console.log (NewMtgCard, req.body.mtgcard, req.body)

    await NewMtgCard.save()

    res.send('success')

}