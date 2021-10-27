
const User = require("../models/Users");
const Event = require("../models/Event");
const Decklist = require("../models/Decklist");
const sendEmail = require('../utils/Nodemailer')
const moment = require('moment')

module.exports.getAllEvents = async (req, res) => {
  
  try {

    const events = await Event.find({}).sort({'dateAndTime': 'desc'}).populate('entrants').populate('decklists')

    return res.status(201).send(events);
}
    catch(e){
     return res.status(500).json({message: `${e}`});
    }
  };


  module.exports.createEvent = async (req, res) => {

    const { name, description, userId, dateAndTime} = req.body

    const user = await User.findById(userId);
    if (user.authorization_level != '1') return res.status(401).json({ message:'not authorized' })
  
    try {
      const newEvent = new Event({ name, description});


      newEvent.dateAndTime = dateAndTime

      await newEvent.save()
  
      res.json({ message:newEvent })
      }catch(e){
          res.json({ message: e })
      }
    };

    module.exports.getEvent = async (req, res) => {

      const { id } = req.params

      try {
        const event = await Event.findById(id).populate('entrants').populate({path: 'decklists', options: {sort:{"place": "ascending"}}})
        res.send(event)

      }catch(e){
        res.json({ message: e })
      }
  
      };

      module.exports.editEvent = async (req,res, next)=>{
        const {id} = req.params || req.body.id;
        const { name, description, dateAndTime} = req.body
    
        console.log(req.body)
    
        try{
        const editedEvent = await Event.findByIdAndUpdate(id, {name: name, description: description, dateAndTime: dateAndTime})
    
        await editedEvent.save();
    
        res.json({ message:editedEvent })
    }catch(e){
        res.json({ message: e })
    }
    }
  
    module.exports.deleteEvent = async (req,res, next)=>{
      const {id} = req.params || req.body.id;
  
      console.log(req.body)
  
      try{
      const deletedEvent = await Event.findByIdAndDelete(id)
  
      res.json({ message:'successfully deleted' })
  }catch(e){
      res.json({ message: e })
  }
  }

  module.exports.toggleComplete = async (req,res, next)=>{
    const {id} = req.params || req.body.id;

    console.log(req.body)

    try{
    const event = await Event.findById(id);

    event.isFinished = !event.isFinished;

    await event.save()

    res.json({ message:'successfully deleted' })
}catch(e){
    res.json({ message: e })
}
}

