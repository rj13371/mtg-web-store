
const User = require("../models/Users");
const Event = require("../models/Event");
const Decklist = require("../models/Decklist");
const sendEmail = require('../utils/Nodemailer')
const moment = require('moment')

module.exports.createDecklist = async (req, res) => {

  let user 

  if(req.body.email){
    user = await User.findOne({email: req.body.email })
  }else{
    user = await User.findById(req.body.userId);
  }

  if(!user) return res.status(500).json({message: 'user not found!'});

  const event = await Event.findById(req.body.eventId).populate('entrants')

  if(!event) return res.status(400).json({message: 'event not found!'});


  //check if user is already registerd, based on email if entered by employee or username if by customer

  let foundEntrant

  if(req.body.email){
    foundEntrant = event.entrants.find(user => user.email == req.body.email)
  }else{
    foundEntrant = event.entrants.find(user => user.username == req.body.username)
  }

  if (foundEntrant)  return res.status(409).json({message: 'user already entered!'});



  try {

    console.log(user)

  const newDecklist = new Decklist();

  newDecklist.deckName = req.body.deckName;
  newDecklist.record = req.body.record;
  newDecklist.cardList = req.body.cardList;
  newDecklist.user = req.body.userId || user._id;
  newDecklist.event = req.body.eventId;


    user.decklists.push(newDecklist);

    event.decklists.push(newDecklist); 
    event.entrants.push(user);

    await user.save();
    await event.save();
    await newDecklist.save();

    return res.status(201).send(`Successful Submission: ${newDecklist} Event: ${event} `);
}
    catch(e){
     return res.status(500).json({message: `${e}`});
    }
  };

  module.exports.getDecklist = async (req, res) => {

    const { id } = req.params

    try {
      const deck = await Decklist.findById(id).populate('user').populate('event')
      res.send(deck)

    }catch(e){
      res.json({ message: e })
    }

    };

    module.exports.editDecklist = async (req,res, next)=>{
      const {id} = req.params || req.body.id;
  
      console.log(req.body)
  
      try{
      const editedDecklist = await Decklist.findByIdAndUpdate(id, {record: req.body.record, cardList: req.body.cardList, deckName: req.body.deckName})
  
      await editedDecklist.save();
  
      res.json({ message:editedDecklist })
  }catch(e){
      res.json({ message: e })
  }
  }

  module.exports.deleteDecklist = async (req,res, next)=>{
    const {id} = req.params || req.body.id;

    console.log(req.body)

    try{
    const editedDecklist = await Decklist.findByIdAndDelete(id)

    res.json({ message:'successfully deleted' })
}catch(e){
    res.json({ message: e })
}
}

module.exports.editRecord = async (req,res, next)=>{
  const {id} = req.params || req.body.id;
  const { record } = req.body

  console.log(req.body)

  try{
  const editedDecklist = await Decklist.findByIdAndUpdate(id, {record: record})

  await editedDecklist.save();

  res.send(editedDecklist)
}catch(e){
  res.json({ message: e })
}
}

module.exports.editPlace = async (req,res, next)=>{
  const {id} = req.params || req.body.id;

  console.log(req.body.place)

  try{
  const editedDecklist = await Decklist.findByIdAndUpdate(id, {place: req.body.place})

  await editedDecklist.save();

  res.send(editedDecklist)
}catch(e){
  res.json({ message: e })
}
}