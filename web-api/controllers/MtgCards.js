
const MtgCard = require('../models/MtgCard');



//added regex for search,
// need to refactor this to change search dynamically based on color, manacost, set etc
module.exports.searchMtgCard = async (req, res, next) =>{

    const foundCard = await MtgCard.find({name: new RegExp('.*'+req.query.name+'.*', "i")})
    console.log (req.query, foundCard)
    
      res.send(foundCard)

}

module.exports.postMtgCard = async (req, res, next) =>{
    const NewMtgCard = new MtgCard(req.body);

    await NewMtgCard.save()

    res.send('success')

}

module.exports.getMtgCard = async (req, res, next)=>{
    const {id} = req.params
    const foundCard = await MtgCard.findById(id)

    console.log (foundCard)
    if (!foundCard) {
    res.send('not found!')}

    res.send(foundCard)
}

module.exports.editMtgCard = async (req,res, next)=>{
    const {id} = req.params;

    const editedCard = await MtgCard.findByIdAndUpdate(id, {...req.body})


    await editedCard.save();

    res.send(editedCard)
}