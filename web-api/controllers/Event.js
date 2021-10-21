
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

      const date = moment(dateAndTime,'DD/MM/YYYY[-]HH:mm').format('YYYY-MM-DD[-]HH:mm') 


      newEvent.dateAndTime = date

      await newEvent.save()
  
      res.json({ message:newEvent })
      }catch(e){
          res.json({ message: e })
      }
    };

    module.exports.getEvent = async (req, res) => {

      const { id } = req.params

      try {
        const event = await Event.findById(id).populate('entrants').populate('decklists')
        res.send(event)

      }catch(e){
        res.json({ message: e })
      }
  
      };